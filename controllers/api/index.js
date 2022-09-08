// collect and package all api routes

const router = require('express').Router();
const userRoutes = require('./user-routes');
const siteRoutes = require('./site-routes');

router.use('/users', userRoutes);
router.use('/sites', siteRoutes);

module.exports = router;