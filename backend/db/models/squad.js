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
            },
            captain: {
                type: DataTypes.INTEGER,
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
            as: 'users',
            foreignKey: 'squadId',
        });
    };
    return Squad;
};
