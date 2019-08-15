require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

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

/**
 * @routes
 */
app.use("/", require("./routes/"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`[Server]: Web server started on http://localhost:${PORT}`)
);
