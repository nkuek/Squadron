'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserGame = sequelize.define(
        'UserGame',
        {
            GameId: DataTypes.INTEGER,
            UserId: DataTypes.INTEGER,
        },
        {}
    );
    UserGame.associate = function (models) {
        UserGame.belongsTo(models.User, { foreignKey: 'UserId' });
        UserGame.belongsTo(models.Game, { foreignKey: 'GameId' });
    };
    return UserGame;
};
