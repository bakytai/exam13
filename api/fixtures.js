const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Place = require('./models/Place');
const Image = require('./models/Image');
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, admin, user2] = await User.create({
        email: 'user@gmail.com',
        password: '0',
        displayName: 'sara',
        token: nanoid(),
        role: 'user'
    }, {
        email: 'admin@mail.ru',
        password: '0',
        displayName: 'admin',
        token: nanoid(),
        role: 'admin'
    }, {
        email: 'user2@mail.ru',
        password: '0',
        displayName: 'john',
        token: nanoid(),
        role: 'user'
    });

    const [place1, place2, place3, place4] = await Place.create({
        user: user1,
        title: 'Del Papa',
        description: 'Some desc about Italian Restaurants',
        photo: 'download.jpeg',
        rate: 0
    }, {
        user: user1,
        title: 'Vinoteka',
        description: 'Some desc about Vinoteka Restaurants',
        photo: 'vinoteka.jpg',
        rate: 0
    }, {
        user: user2,
        title: 'Cyclone',
        description: 'The «Cyclone» Restaurant was opened in order to hand down an ancient Italian tradition to the residents and guests of Bishkek city.',
        photo: 'cyclone.jpeg',
        rate: 0
    }, {
        user: user2,
        title: 'Restoran Pishpek',
        description: 'Ресторан Пишпек – это уникальное заведение в центре города, которое выделяется архитектурным строением, дополняя красоту Бишкека.',
        photo: 'pishpek.jpeg',
        rate: 0
    });

    const [imgOne, imgTwo, imgThree, imgFour, imgFive, imgSix, imgSeven, imgEight] = await Image.create({
        user: user1,
        place: place4,
        image: 'pishPhot.jpeg'
    }, {
        user: user1,
        place: place4,
        image: 'pishpekPhoto.jpeg'
    }, {
        user: user1,
        place: place3,
        image: 'cyclonePhoto2.jpeg'
    }, {
        user: user1,
        place: place3,
        image: 'cyclonePhoto.jpeg'
    }, {
        user: user2,
        place: place1,
        image: 'delpapa.jpeg'
    }, {
        user: user2,
        place: place1,
        image: 'delpapa2.jpeg'
    },{
        user: user2,
        place: place2,
        image: 'vinotekaPhoto1.jpeg'
    }, {
        user: user2,
        place: place2,
        image: 'vinotekphoto2.jpeg'
    });

    await mongoose.connection.close();
};

run().catch(e => console.log(e));
