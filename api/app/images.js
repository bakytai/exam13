const express = require('express');
const Image = require('../models/Image');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middleware/auth");

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

router.post("/", auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.place) {
            return res.status(400).send({error: 'Place id is required'});
        }
        if (!req.file.filename) {
            return res.status(400).send({message: 'Image are required!'});
        }

        const imageData = {
            user: req.user._id,
            place: req.body.place,
            image: req.file.filename
        };

        const image = new Image(imageData);
        await image.save();
        return res.send(image);
    } catch(e) {
        next(e);
    }
});


router.delete('/:id', auth, async (req, res, next) => {
    try {
        if (req.user.role === 'admin'){
            const image = await Image.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted place!'});
        }
        return  res.status(400).send({error: 'you dont have right'});
    } catch (e) {
        return next(e)
    }
});
module.exports = router;