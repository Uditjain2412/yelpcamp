const { cloudinary } = require('../cloudinary');
const Campground = require('../models/campground');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });
const uploadToCloudinary = require('../utils/cloudinaryUploader')

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.allCampgrounds = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds })
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.createCampground = async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.geometry = await geocodingClient.forwardGeocode({
        query: campground.location,
        limit: 1
    })
        .send()
        .then(geo => geo.body.features[0].geometry);
    for (let f of req.files) {
        const localPath = f.path;
        const result = await uploadToCloudinary.uploadToCloudinary(localPath);
        campground.images.push({ url: result.url, filename: result.filename });
    }
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', `Successfully created ${campground.title}`)
    res.redirect('/campgrounds')
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    campground.geometry = await geocodingClient.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    })
        .send()
        .then(geo => geo.body.features[0].geometry);
    if (req.files) {
        for (let f of req.files) {
            const localPath = f.path;
            const result = await uploadToCloudinary.uploadToCloudinary(localPath);
            campground.images.push({ url: result.url, filename: result.filename });
        }
    }
    await campground.save();
    if (req.body.deleteImages) {
        cloudinary.uploader.destroy(req.body.deleteImages);
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    req.flash('success', `Successfully deleted ${campground.title}`)
    res.redirect('/campgrounds')
}
