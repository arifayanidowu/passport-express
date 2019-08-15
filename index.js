require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();

/**
 * @use passport for authentication
 */
require("./config/passport.js")(passport);
/**
 * @use db connection
 */
require("./config/db");

/**
 * @set EJS view
 */
app.use(expressLayouts);
app.set("view engine", "ejs");

/**
 * @set cors middleware
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Set Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

/**
 * @routes
 */
app.use("/", require("./routes/"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`[Server]: Web server started on http://localhost:${PORT}`)
);
