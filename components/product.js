const product = require("../models/product");
const makrApiCall = require("./APIcall");
const sendSMS = require("./sendSMS");
const getProducts = async () => {
  let response = await product.get();
  // let response = await sendSMS.sendSMS();
  // console.log("response in get products")
  // console.log(response)
  // if (response.success) {
  // process.exit(0);
  // makrApiCall.callAPI("GET", "https://api.github.com/users", {});
  // console.log("Product components successfully");
  if (response.success) {
    
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.message };
  }
};
const getSingleProducts = async (data) => {
  let response = await product.getSingleProduct(data);
  if (response.success) {
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.message };
  }
  return { success: true, data: "single  products with id " + data.productId };
};
const createProduct = (data) => {
  return { success: true, data: data };
};

module.exports = { getProducts, getSingleProducts, createProduct };
