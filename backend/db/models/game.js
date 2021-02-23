'use strict';
module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define(
        'Game',
        {
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            genre: DataTypes.STRING,
        },
        {}
    );
    Game.associate = function (models) {};
    return Game;
};
