'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Events', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING(50),
            },
            date: {
                type: Sequelize.DATE,
            },
            details: {
                type: Sequelize.TEXT(500),
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: 'Users' },
            },
            squadId: {
                type: Sequelize.INTEGER,
                references: { model: 'Squads' },
            },
            gameId: {
                type: Sequelize.INTEGER,
                references: { model: 'Games' },
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
        return queryInterface.dropTable('Events');
    },
};
