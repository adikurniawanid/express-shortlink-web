const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const session = require("express-session");
const cookie = require("cookie-parser");
const path = require("path");
const flash = require("connect-flash");
require("dotenv").config();
const { linkRouter, authRouter } = require("./routes");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookie("secret"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use("/link", linkRouter);
app.use("/auth", authRouter);
app.get("/:shortLink", async (req, res, next) => {
  try {
    res.redirect(`http://localhost:3000/${req.params.shortLink}`);
  } catch (error) {
    next(error);
  }
});

app.use(require("./middlewares/errorHandler.middleware"));

module.exports = app;
