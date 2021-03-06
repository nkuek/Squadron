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
                type: Sequelize.STRING,
            },
            date: {
                type: Sequelize.DATE,
            },
            details: {
                type: Sequelize.TEXT,
            },
            UserId: {
                type: Sequelize.INTEGER,
                references: { model: 'Users' },
            },
            SquadId: {
                type: Sequelize.INTEGER,
                references: { model: 'Squads' },
            },
            GameId: {
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
