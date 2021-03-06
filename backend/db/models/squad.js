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
            squadImage: {
                type: DataTypes.TEXT,
            },
        },
        {}
    );
    Squad.associate = function (models) {
        Squad.belongsToMany(models.User, {
            as: 'squadmates',
            through: 'Squadmate',
            foreignKey: 'SquadId',
            otherKey: 'UserId',
        });

        Squad.belongsTo(models.User, {
            as: 'captain',
            foreignKey: 'captainId',
        });

        Squad.belongsToMany(models.Game, {
            as: 'squadgames',
            through: 'SquadGame',
        });
    };
    return Squad;
};
