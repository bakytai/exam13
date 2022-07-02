const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, admin] = await User.create({
        email: 'user@gmail.com',
        password: '0',
        displayName: 'sara',
        token: '5enDI2paOqusPavVWOnwB',
        role: 'user'
    }, {
        email: 'admin@mail.ru',
        password: '0',
        displayName: 'john',
        token: '8enDI2paOqusBavVWOnwL',
        role: 'admin'
    });

    await mongoose.connection.close();
};

run().catch(e => console.log(e));
