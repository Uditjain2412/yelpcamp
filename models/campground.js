const mongoose = require('mongoose');
const Review = require('./review')

const Schema = mongoose.Schema;

const ImageSchema = Schema({
    url: String,
    filename: String
})

const CampgroundSchema = Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: 'string',
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

CampgroundSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);
