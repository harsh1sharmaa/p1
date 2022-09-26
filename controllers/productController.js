const productComponent = require("../components/product");
const getProducts = (req, res) => {
 
  res.send(productComponent.getProducts(data))
 
};

const getSingleProducts = (req, res) => {
  let data = req.params;
  res.send(productComponent.getSingleProducts(data))
  
};
const createProduct = (req, res) => {
  let data = req.body;
  res.send(productComponent.createProduct(data))
   
};

module.exports = { getProducts, createProduct,getSingleProducts};
