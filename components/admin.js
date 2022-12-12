const admin = require("../models/admin");
const getAdminInfo = async () => {
  console.log("global.role");
  console.log(global.role);
  let userResponse = await admin.getAdmin();
  if (userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};
const getAllOrders = async () => {
  //   console.log("global.role");
  //   console.log(global.role);
  let userResponse = await admin.getAllOrders();
  if (userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};
const updateOrderStatus = async (data) => {
  //   console.log("global.role");
  //   console.log(global.role);
  let userResponse = await admin.updateOrderStatus(data);
  if (userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};

module.exports = { getAdminInfo, getAllOrders, updateOrderStatus };
