const express = require('express');
const Image = require('../models/Image');

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        let query = {};

        if (req.query.place) {
            query.place = req.query.place;
        }

        const images = await Image.find(query);
        return res.send(images);
    } catch(e) {
        next(e);
    }
});


module.exports = router;