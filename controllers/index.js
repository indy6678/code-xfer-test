// collect packaged routes

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);


// catch all requests for nonexistent enpoints
router.use((req, res) => {
    res.status(404).send("<h1>These aren't the routes you're looking for!</h1><h2>You can go about your business. Move along!</h2>").end();
});

module.exports = router;