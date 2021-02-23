'use strict';
module.exports = (sequelize, DataTypes) => {
    const Squad = sequelize.define(
        'Squad',
        {
            squadName: DataTypes.STRING,
            genres: DataTypes.ARRAY(DataTypes.STRING),
        },
        {}
    );
    Squad.associate = function (models) {
        // associations can be defined here
    };
    return Squad;
};
