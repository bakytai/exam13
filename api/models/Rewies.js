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
    rate: {
        type: Number,
        required: true,
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
