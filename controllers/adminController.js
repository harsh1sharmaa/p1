const admin = require("../components/admin");
const info = async (req, res) => {
  //   let data = req.body;
  console.log("validate otp data");
  console.log(global.userId);
  let response = await admin.getAdminInfo();
  if (response.success) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, message: response.message });
  }
};
const getOrders = async (req, res) => {
  //   let data = req.body;
  //   console.log("validate otp data");
  //   console.log(global.userId);
  let response = await admin.getAllOrders();
  if (response.success) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, message: response.message });
  }
};
const updateOrderStatus = async (req, res) => {
    let data = req.body;
  //   console.log("validate otp data");
  //   console.log(global.userId);
  let response = await admin.updateOrderStatus(data);
  if (response.success) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, message: response.message });
  }
};

module.exports = { info, getOrders, updateOrderStatus };
