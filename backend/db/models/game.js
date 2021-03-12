'use strict';
module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define(
        'Game',
        {
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            genres: DataTypes.ARRAY(DataTypes.STRING),
            rating: DataTypes.FLOAT,
            metacritic: DataTypes.FLOAT,
            platforms: DataTypes.ARRAY(DataTypes.STRING),
            released: DataTypes.STRING,
        },
        {}
    );
    Game.associate = function (models) {
        Game.belongsToMany(models.Squad, {
            through: 'SquadGame',
        });

        Game.belongsToMany(models.User, {
            as: 'usergames',
            through: 'UserGame',
            foreignKey: 'GameId',
            otherKey: 'UserId',
        });
    };

    return Game;
};
