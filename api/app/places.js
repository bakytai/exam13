const express = require('express');
const Place = require('../models/Place');
const path = require("path");
const auth = require("../middleware/auth");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get("/", async (req, res, next) => {
    try {
        const places = await Place.find();
        return res.send(places);
    } catch(e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const place = await Place.findById(req.params.id)

        if (!place) {
            return res.status(404).send({message: 'Not found place'});
        }

        return res.send(place);
    } catch (e) {
        next(e);
    }
});

router.post("/", auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.check) {
            return res.status(400).send({error: 'Please check the box!'});
        }
        if (!req.body.title || !req.body.description) {
            return res.status(400).send({message: 'Title or description are required!'});
        }

        if (!req.file.filename) {
            return res.status(400).send({message: 'Image are required!'});
        }

        const placeData = {
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
            photo: req.file.filename
        };

        const place = new Place(placeData);
        await place.save();
        return res.send(place);
    } catch(e) {
        next(e);
    }
});

module.exports = router;