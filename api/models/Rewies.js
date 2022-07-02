const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    place: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Place',
    },
    message: {
        type: String,
        required: true
    },
    kitchenRate: {
        type: Number,
        required: true
    },
    serviceRate: {
        type: Number,
        required: true
    },
    interiorRate: {
        type: Number,
        required: true
    },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
