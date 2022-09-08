const router = require('express').Router();
const {User} = require('../../models');

// GET to show all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => {
      // console.log(dbUserData);
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });

});

// GET to show an individual user by id
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'email', 'username'],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user was found with that id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//POST to create a new user
router.post("/", (req, res) => {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE to delete a selected user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user was found with that id"})
            return;
        }
        res.json(dbUserData);
    })
    .catch((err)=> {
        // console.log(err);
        res.status(500).json(err);
    })
})

// login route
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if(!dbUserData) {
      res.status(400).json({ message: 'No user available with that email address!'})
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if(!validPassword) {
      res.status(400).json({ message: 'Incorrect password!'});
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'Your are now logged in!'});
    });
  });
});

// logout route
router.post('/logout', (req, res) => {
  if(req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

module.exports = router;