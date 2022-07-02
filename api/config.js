const path = require('path');

const rootPath = __dirname;

let port = 8000;
let dbUrl = 'mongodb://localhost/app';

if (process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://localhost/app-test';
    port = 8010
}

module.exports = {
    port,
    corsWhiteList: [
        'http://localhost:4200',
        'https://localhost:4200',
        'http://localhost:4210',
        'https://localhost:4210'
    ],
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: dbUrl,
        options: {useNewUrlParser: true},
    }
};