const router = require("express").Router();
const { Site } = require("../models");

// const sequelize = require('../config/connection')

// test route for configuration validation
// router.get('/', (req, res) => {
//     res.send('<h1>Here we are!</h1>');
// })

// GET to show all websites
router.get("/", (req, res) => {
  console.log(req.session)
    Site.findAll({
      attributes: ["id", "website",],
    })
      .then((dbSiteData) => {
        console.log(dbSiteData);
        // serialize the data
        const sites = dbSiteData.map(site=> site.get({ plain: true}));
        // passes a single site object into homepage template
        res.render('homepage', {
            sites,
            loggedIn: req.session.loggedIn
        })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });

// login route
router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
})

module.exports = router;
