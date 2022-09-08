const { DataTypes, Model } = require('sequelize');
// import database connection
const sequelize = require('../config/connection');

class Site extends Model {}

Site.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        // pass in database connection
        sequelize,
        // don't pluralize names of database tables
        freezeTableName: true,
        // use underscore instead of camelcase
        underscored: true,
        // forces the model name to stay lowercase in the database
        modelName: 'site'
    }
);

module.exports = Site;