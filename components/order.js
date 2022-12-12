const order = require("../models/order");
const getOrders = async () => {
  let response = await order.get();
  // let response = await sendSMS.sendSMS();
  console.log("response in get orders");
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
const getSingleOrder = async (data) => {
  let response = await order.getSingleOrder(data.orderId);
  // let response = await sendSMS.sendSMS();
  console.log("response single in get orders");
  console.log(response);
  // console.log(response)
  // if (response.success) {
  // process.exit(0);
  // makrApiCall.callAPI("GET", "https://api.github.com/users", {});
  // console.log("Product components successfully");
  if (response.success) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    return { success: false, message: response.message };
  }
};
const createOrder = async (data) => {
  let response = await order.create(data);
  // let response = await sendSMS.sendSMS();
  console.log("response data post create in get orders");
  console.log(response);
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
module.exports = { getOrders, createOrder, getSingleOrder };
