const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController")

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});
router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/getuser", (req, res, next) => {
  res.send("respond with a get user resource");
});

module.exports = router;
