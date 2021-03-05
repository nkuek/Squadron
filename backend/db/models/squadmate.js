'use strict';
module.exports = (sequelize, DataTypes) => {
    const Squadmate = sequelize.define(
        'Squadmate',
        {
            UserId: DataTypes.INTEGER,
            SquadId: DataTypes.INTEGER,
        },
        {}
    );
    Squadmate.associate = function (models) {
        Squadmate.belongsTo(models.User, {
            as: 'squadmates',
            foreignKey: 'UserId',
        });
        Squadmate.belongsTo(models.Squad, {
            foreignKey: 'SquadId',
        });
    };
    return Squadmate;
};
