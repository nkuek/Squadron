'use strict';
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'Event',
        {
            title: DataTypes.STRING,
            date: DataTypes.DATE,
            details: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
            squadId: DataTypes.INTEGER,
            gameId: DataTypes.INTEGER,
        },
        {}
    );
    Event.associate = function (models) {
        Event.belongsTo(models.User, { foreignKey: 'userId' });

        Event.belongsTo(models.Squad, { foreignKey: 'squadId' });

        Event.belongsTo(models.Game, { foreignKey: 'gameId' });
    };
    return Event;
};
