'use strict';
module.exports = (sequelize, DataTypes) => {
    const Squadmate = sequelize.define(
        'Squadmate',
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            squadId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Squads',
                    key: 'id',
                },
            },
        },
        {}
    );
    Squadmate.associate = function (models) {
        // associations can be defined here
    };
    return Squadmate;
};
