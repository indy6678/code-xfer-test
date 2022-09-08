const router = require('express').Router();
const{ Site, User} = require('../../models');

// GET to show all websites
router.get("/", (req, res) => {
    Site.findAll({
      attributes: ["id", "website"],
    })
      .then((dbSiteData) => {
        // console.log(dbUserData);
        res.json(dbSiteData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  
  // POST to create a new website
  router.post("/", (req, res) => {
    Site.create({
      website: req.body.website,
    })
      .then((dbSiteData) => res.json(dbSiteData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // GET to load a single website
  router.get("/:id", (req, res) => {
    Site.findOne({
      where: {
          id: req.params.id
      },
      attributes: ["id", "website"],
    })
      .then((dbSiteData) => {
        if (!dbSiteData) {
          res.status(404).json({ message: "No site found with that id" });
          return;
        }
        res.json(dbSiteData);
      })
      .then((dbSiteData) => res.json(dbSiteData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // DELETE to remove a website
  router.delete("/:id", (req, res) => {
      Site.destroy({
        where: {
            id: req.params.id
        },
      })
        .then((dbSiteData) => {
          if (!dbSiteData) {
            res.status(404).json({ message: "No site found with that id" });
            return;
          }
          res.json(dbSiteData);
        })
        .then((dbSiteData) => res.json(dbSiteData))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    module.exports = router;