const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

/**
 * @method GET login
 *
 */
router.get("/login", (req, res) => {
  res.status(200).render("login");
});

/**
 * @method GET register Page
 */
router.get("/register", (req, res) => {
  res.status(200).render("register");
});

/**
 * @method POST register
 */
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "password should be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // validation
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        errors.push({ msg: `An Error occured while creating your account.` });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      }
      if (user) {
        errors.push({ msg: `Email is already registered` });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({ name, email, password });
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch(err => {
                req.flash("error_msg", "Unable to register");
                res.redirect("/users/register");
              });
          });
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are now logged out");
  res.redirect("/users/login");
});

module.exports = router;
