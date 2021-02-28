'use strict';
module.exports = (sequelize, DataTypes) => {
    const Squadmate = sequelize.define(
        'Squadmate',
        {
            userId: DataTypes.INTEGER,
            squadId: DataTypes.INTEGER,
        },
        {}
    );
    Squadmate.associate = function (models) {
        Squadmate.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'userId',
        });
        Squadmate.belongsTo(models.Squad, {
            as: 'squads',
            foreignKey: 'squadId',
        });
    };
    return Squadmate;
};
