const express = require('express');
const Reviews = require('../models/Reviews');
const Place = require('../models/Place');
const auth = require("../middleware/auth");

const router = express.Router();

const getAverage = (numbers) => {
    const sum = numbers.reduce((acc, number) => acc + number, 0);
    const length = numbers.length;
    return sum / length;
};


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

        let food = [];
        let serv = [];
        let intr = [];

        const allReviews = await Reviews.find({place: reviewsData.place});

        allReviews.forEach(review => {
            food.push(review.kitchenRate);
            serv.push(review.serviceRate);
            intr.push(review.interiorRate);
        });

        const foodRate = getAverage(food);
        const servRate = getAverage(serv);
        const interRate = getAverage(intr);
        const totalRate = (foodRate + servRate + interRate) / 3;

        await Place.updateOne({_id: reviewsData.place}, {
            rate: Math.round(totalRate),
            kitchenRate: Math.round(foodRate),
            serviceRate: Math.round(servRate),
            interiorRate: Math.round(interRate)
        });

        return res.send(reviews);
    } catch(e) {
        next(e);
    }
});

module.exports = router;