'use strict';

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
                type: Sequelize.STRING(256),
                defaultValue: 'No description',
            },
            captainId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Users' },
            },
            primaryType: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            secondaryType: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'None',
            },
            squadImage: {
                type: Sequelize.TEXT,
                defaultValue:
                    'https://st2.depositphotos.com/4410397/7876/v/600/depositphotos_78763754-stock-illustration-game-controller-icon.jpg',
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
