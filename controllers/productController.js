const productComponent = require("../components/product");
const getProducts = async (req, res) => {
  let response = await productComponent.getProducts();
  if (response.success == true) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, data: response.data });
  }
};

const getSingleProducts = (req, res) => {
  let data = req.params;
  res.send(productComponent.getSingleProducts(data));
};
const createProduct = (req, res) => {
  let data = req.body;
  res.send(productComponent.createProduct(data));
};

module.exports = { getProducts, createProduct, getSingleProducts };
