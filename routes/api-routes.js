// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const favorite = require("../models/favorite");

module.exports = function (app) {
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

  // app.post("api/favoritesrch", (req, res) => {
  //   db.user_favorite.findAll({
  //     where:{
  // user_id: req.user.id,
  // favorite_id: req.body.name
  //     }
  //   })
  // })
  // ^^^ rough draft on how to locate row in association for 

  app.post("/api/favorite", (req, res) => {
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
};
