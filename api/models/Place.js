const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mime = require('mime-types');
const config = require('../config');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const PlaceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        validate: {
            validator: function(value) {
                const filePath = path.join(config.uploadPath, value);

                const mimeType = mime.lookup(filePath);

                return imageMimeTypes.includes(mimeType);
            },
            message: 'Image file format is incorrect'
        }
    },
    rate: {
        type: Number,
        default: 0
    },
    kitchenRate: {
        type: Number,
    },
    serviceRate: {
        type: Number,
    },
    interiorRate: {
        type: Number
    }
    });

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;