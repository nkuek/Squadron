'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Users',
            [
                {
                    email: 'demo@user.io',
                    username: 'Demo-lition',
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync('password'),
                },
                {
                    email: faker.internet.email(),
                    username: 'nick',
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync('Kuching3503!'),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
                {
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    profilePicture: 'https://picsum.photos/200',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Users');
    },
};
