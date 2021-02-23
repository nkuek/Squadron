'use strict';

const { DataTypes } = require('sequelize/types');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Squads', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            squadName: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'No description',
            },
            captain: {
                allowNull: false,
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('Squads');
    },
};
