'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserGames', {
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
            UserId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Users' },
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
        return queryInterface.dropTable('UserGames');
    },
};
