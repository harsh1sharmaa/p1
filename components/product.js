const product = require("../models/product");
const makrApiCall = require("./APIcall");
const sendSMS = require("./sendSMS");

/**
 * this funtion return All products
 * @returns
 */
const getProducts = async () => {
  let response = await product.get();
  if (response === undefined) {
    return { success: false, message: "error in getting products" };
  }
  if ( response.success) {
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.message };
  }
};

/**
 * this funtion return Single Product
 * @param {*} data
 * @returns
 */
const getSingleProducts = async (data) => {
  let response = await product.getSingleProduct(data);
  if (response === undefined) {
    return { success: false, message: "error in getting Single product" };
  }
  if (response.success) {
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.message };
  }
};

/**
 * this funtion use to create Product
 * @param {*} data
 * @returns
 */
const createProduct = (data) => {
  return { success: true, data: data };
};

module.exports = { getProducts, getSingleProducts, createProduct };
