const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const review = new Review(req.body.review);
    const campground = await Campground.findById(id);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully added review!')
    res.redirect(`/campgrounds/${id}`);
}
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
        req.flash('error', 'Cannot find that review!');
        return res.redirect('/campgrounds');
    }
    const campground = await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}
