'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Games', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            genres: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            rating: {
                type: Sequelize.FLOAT,
            },
            metacritic: {
                type: Sequelize.INTEGER,
            },
            platforms: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            released: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Games');
    },
};
