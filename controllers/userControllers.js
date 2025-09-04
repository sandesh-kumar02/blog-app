const User = require("../models/User.models.js");
const { validationResult } = require("express-validator");
const passport = require("passport");
const signup = (req, res) => {
  res.render("signup.ejs", {errors : []});
};

const login = (req, res) => {
  res.render("login.ejs");
};

const home = (req, res) => {
  res.render("home.ejs");
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/blogs/create",
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err, next) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

const signupUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('signup', {errors : errors.array()});
  }
  try {
    const { username, email, password } = req.body;
    const newUser = await User.register({ username, email }, password);
    console.log(newUser);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup: signup,
  signupUser: signupUser,
  login: login,
  loginUser: loginUser,
  home: home,
  logout: logout,
};
