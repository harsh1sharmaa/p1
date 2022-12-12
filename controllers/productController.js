const productComponent = require("../components/product");
const getProducts = async (req, res) => {
  // res.send("hello world!");
  let response = await productComponent.getProducts();
  if (response.success == true) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, data: response.message });
  }
};

const getSingleProducts = async (req, res) => {
  let data = req.params;
  let response = await productComponent.getSingleProducts(data);
  if (response.success) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, message: response.message });
  }
};
const createProduct = (req, res) => {
  let data = req.body;
  res.send(productComponent.createProduct(data));
};

module.exports = { getProducts, createProduct, getSingleProducts };
