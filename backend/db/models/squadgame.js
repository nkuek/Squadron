'use strict';
module.exports = (sequelize, DataTypes) => {
    const SquadGame = sequelize.define(
        'SquadGame',
        {
            gameId: DataTypes.INTEGER,
            squadId: DataTypes.INTEGER,
        },
        {}
    );
    SquadGame.associate = function (models) {
        SquadGame.belongsTo(models.Game, {
            foreignKey: 'GameId',
        });
        SquadGame.belongsTo(models.Squad, {
            foreignKey: 'SquadId',
        });
    };
    return SquadGame;
};
