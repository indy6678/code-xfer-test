const User = require('./user');
const Site = require('./site');

User.hasMany(Site, {
    foreignKey: 'user_id',
})

Site.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Site };