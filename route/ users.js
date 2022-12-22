const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/validateotp", userController.validateOtp);

router.get("/getuser", (req, res, next) => {
  res.send("respond with a get user resource");
});

module.exports = router;
