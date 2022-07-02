const express = require('express');
const Place = require('../models/Place');

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const places = await Place.find();

        return res.send(places);
    } catch(e) {
        next(e);
    }
});


module.exports = router;