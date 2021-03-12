'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('SquadGames', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            GameId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Games' },
            },
            SquadId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Squads' },
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
        return queryInterface.dropTable('SquadGames');
    },
};
