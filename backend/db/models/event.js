'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    details: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    squadId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};