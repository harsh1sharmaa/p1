const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/* GET users listing. */

router.get("/orders", orderController.getOrders);
router.get("/order/:orderId", orderController.getSingleOrder);
router.post("/order", orderController.createOrder);

module.exports = router;