const express = require("express");
const router = express.Router();

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
    res.send("pass");
  }
});

module.exports = router;
