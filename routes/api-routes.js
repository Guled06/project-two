// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// const favorite = require("../models/favorite");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // Route that gets all favorites from database
  // need to amend to ensure it works on a per user basis
  //---------------------------------------------------
  // TEST WORK
  //---------------------------------------------------
  app.post("/api/favorites", (req, res) => {
    if (req.user) {
      db.Favorite.findOrCreate({
        where: {
          name: req.body.name,
          location: req.body.location,
          phone: req.body.phone,
          latitude: req.body.latitude,
          longitude: req.body.longitude
        }
      }).then(data => {
        res.json(data);
      });
    }
  });

  app.get("/api/favorites", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      db.user_favorite
        .findAll({
          where: {
            id: req.user.id
          }
        })
        .then(newFav => {
          res.json(newFav);
        });
    }
  });

  app.post("/api/favorite", (req, res) => {
    // check if exists in database before creating!
    // if it does, use that id
    // if not, creat a new one, then use that one
    console.log(req.body);
    db.Favorite.create({
      name: req.body.name,
      location: req.body.location,
      phone: req.body.phone,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    })
      .then(() => {
        res.end("added brewery to favorites!");
      })
      .catch(err => {
        res.status(401).json(err);
        // ^^^ don't know if this is the correct status code
      });
  });

  // hook up to favorite button press! will need to add a condition for if they're logged in
  app.post("/api/user_favorite", (req, res) => {
    console.log(req.body);
    db.UserFavorite.create({
      favorite_id: req.body.favorite_id,    // eslint-disable-line
      //   // user_id: req.user.id           //what we'll use once integrated with front-end
      user_id: req.body.user_id       // eslint-disable-line
    }).then(() => {
      res.end("added favorite to profile");
    });
  });
  // ^^^ end of test
  // =========================================================
  app.post("/api/user_favorite/view", (req, res) => {
    db.User.findAll({
      attributes: ["id", "email", "createdAt", "updatedAt"],
      where: {
        // id: req.user.id   // what we'll use once integrated with front-end
        id: req.body.id
      },
      include: db.Favorite
    }).then(data => {
      delete data[0].password;
      res.json(data);
    });
  });

  // app.destroy TEST WORK
  // ===============================
  app.delete("api/favorites:id", (req, res) => {
    db.UserFavorite.destroy({
      where: {
        favorite_id: req.params.id, // eslint-disable-line 
        // params could be user input via submit button, correct?
        user_id: req.user.id // eslint-disable-line
      }
    }).then(newFav => {
      res.json(newFav);
    });
  });
};
