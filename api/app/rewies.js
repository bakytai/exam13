const express = require('express');
const Reviews = require('../models/Reviews');
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        let query = {};

        if (req.query.place) {
            query.place = req.query.place;
        }
        const reviews = await Reviews.find(query).populate('user', 'displayName');
        return res.send(reviews);
    } catch(e) {
        next(e);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        const reviewsData = {
            user: req.user._id,
            place: req.body.place,
            message: req.body.message,
            kitchenRate: req.body.kitchenRate,
            serviceRate: req.body.serviceRate,
            interiorRate: req.body.interiorRate,
        };

        const reviews = new Reviews(reviewsData);
        await reviews.save();
        return res.send(reviews);
    } catch(e) {
        next(e);
    }
});

module.exports = router;