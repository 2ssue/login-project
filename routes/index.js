/**
 * root routing
 */

const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  res.render("layout");
});

router.get("/login", function(req, res, next) {
  res.render("layout");
});

router.get("/signup", function(req, res, next) {
  res.render("layout");
});

router.get("/main", function(req, res, next) {
  res.redirect("/");
});

module.exports = router;
