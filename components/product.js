const product = require("../models/product");
const getProducts = async() => {
  let response = await product.get();
  // if (response.success) {
    // console.log(response)
    console.log("Product components successfully")
    return { success: true, data: response };
  // } else {
    // return { success: false, message: response.message };
  // }
};
const getSingleProducts = (data) => {
  return { success: true, data: "single  products with id " + data.productId };
};
const createProduct = (data) => {
  return { success: true, data: data };
};

module.exports = { getProducts, getSingleProducts, createProduct };
