'use strict';
module.exports = (sequelize, DataTypes) => {
    const Squad = sequelize.define(
        'Squad',
        {
            squadName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [4, 50],
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'No description',
                validate: {
                    len: [1, 256],
                },
            },
            captainId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            primaryType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            secondaryType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {}
    );
    Squad.associate = function (models) {
        Squad.belongsToMany(models.User, {
            through: 'Squadmates',
            foreignKey: 'squadId',
            otherKey: 'userId',
        });
        Squad.belongsTo(models.User, { foreignKey: 'captainId' });
    };
    return Squad;
};
