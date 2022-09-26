const express = require("express");
const router = express.Router();
// GET home page.
router.get("/", function (req, res) {
  res.send("hellhrtueruyto");
});
router.get("/dsfd", function (req, res) {
    res.redirect("/catalog");
  });

module.exports = router;
  