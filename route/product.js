const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/* GET users listing. */

router.get("/products", productController.getProducts);
router.get("/product/:productId", productController.getSingleProducts);
router.post("/product", productController.createProduct);

router.get("/getuser", (req, res, next) => {
  res.send("respond with a get user resource");
});

module.exports = router;
