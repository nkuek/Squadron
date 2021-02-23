'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};