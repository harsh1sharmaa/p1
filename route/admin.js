const express = require("express");
const router = express.Router();
const adminController=require("../controllers/adminController")

/* GET users listing. */
// router.get("/", (req, res, next) => {
//   res.send("respond with a resource");
// });
router.get("/info", adminController.info);
router.get("/orders", adminController.getOrders);
router.post("/updateorderstatus", adminController.updateOrderStatus);
router.post("/updateproduct", adminController.updateProduct);
// router.post("/validateotp", userController.validateOtp);

// router.get("/getuser", (req, res, next) => {
//   res.send("respond with a get user resource");
// });

module.exports = router;
