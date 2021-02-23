'use strict';
module.exports = (sequelize, DataTypes) => {
  const SquadGame = sequelize.define('SquadGame', {
    gameId: DataTypes.INTEGER,
    squadId: DataTypes.INTEGER
  }, {});
  SquadGame.associate = function(models) {
    // associations can be defined here
  };
  return SquadGame;
};