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
        Squadmate.belongsTo(models.User, { foreignKey: 'userId' });
        Squadmate.belongsTo(models.Squad, { foreignKey: 'squadId' });
    };
    return Squadmate;
};
