const express = require('express');
const User = require('../models/User');
const mongoose = require("mongoose");

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.displayName) {
            return res.status(400).send({message: 'Please complete all fields'});
        }

        const userData = {
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
        };

        const user = new User(userData);
        user.generateToken();

        await user.save();

        res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).send({error: 'Email not found'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'})
    }

    user.generateToken();
    await user.save();

    return  res.send(user);
});

router.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const message = {message: 'OK'};

        if (!token) return res.send(message);

        const user = await User.findOne({token});

        if (!user) return res.send(message);

        user.generateToken();
        await user.save();

        return res.send(message);
    } catch (e) {
        next(e);
    }
});

module.exports = router;