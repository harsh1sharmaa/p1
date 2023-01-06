const admin = require("../models/admin");

/**
 * @returns
 * this funtion return Admin Info
 */
const getAdminInfo = async () => {
  console.log("global.role");
  console.log(global.role);
  let userResponse = await admin.getAdmin();
  if (userResponse === undefined) {
    return { success: false, message: "error in getAdminInfo" };
  }
  if (userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};

/**
 * this function returns the All forder only for Admin
 * @returns
 */
const getAllOrders = async () => {
  //   console.log("global.role");
  //   console.log(global.role);
  let userResponse = await admin.getAllOrders();
  if (userResponse === undefined) {
    return { success: false, message: "error in getAllOrders" };
  }

  if (userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};
const updateOrderStatus = async (data) => {
    // console.log("global.role");
  //   console.log(global.role);
  let userResponse = await admin.updateOrderStatus(data);
  if (userResponse === undefined) {
    return { success: false, message: "error in updateOrderStatus" };
  }

  if (userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};
const updateProduct = async (data) => {
  return { success: true, data: data };

  let userResponse = await admin.updateProduct(data);
  if (userResponse === undefined) {
    return { success: false, message: "error in update product" };
  }

  if (userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};

module.exports = { getAdminInfo, getAllOrders, updateOrderStatus,updateProduct };
