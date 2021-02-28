'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(30),
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(256),
            },
            hashedPassword: {
                allowNull: false,
                type: Sequelize.STRING.BINARY,
            },
            profilePicture: {
                type: Sequelize.TEXT,
                defaultValue:
                    'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    },
};
