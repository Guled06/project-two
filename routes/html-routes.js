// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/landing", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/my-profile");
    }
    res.render("landing");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/my-profile");
    }
    res.render("login");
  });

  app.get("/index", (req, res) => {
    return res.render("index", {});
  });

  app.get("/main", (req, res) => {
    return res.render("main", {});
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/my-profile", isAuthenticated, (req, res) => {
    res.render("my-profile", { email: req.user.email });
  });

  app.get("*", (req, res) => {
    return res.render("landing", {});
  });
};
