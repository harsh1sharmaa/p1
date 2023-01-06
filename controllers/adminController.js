const admin = require("../components/admin");
const info = async (req, res) => {
  //   let data = req.body;
  console.log("validate otp data");
  console.log(global.userId);
  let response = await admin.getAdminInfo();
  if (response.success) {
   return res.send({ success: true, data: response.data });
  } else {
   return  res.send({ success: false, message: response.message });
  }
};
const getOrders = async (req, res) => {
  //   let data = req.body;
  //   console.log("validate otp data");
  //   console.log(global.userId);
  let response = await admin.getAllOrders();
  if (response.success) {
   return  res.send({ success: true, data: response.data });
  } else {
   return  res.send({ success: false, message: response.message });
  }
};
const updateOrderStatus = async (req, res) => {
    let data = req.body;
    console.log("req.body");
    console.log(data);
  //   console.log("validate otp data");
  //   console.log(global.userId);
  let response = await admin.updateOrderStatus(data);
  if (response.success) {
    return res.send({ success: true, data: response.data });
  } else {
    return res.send({ success: false, message: response.message });
  }
};
const updateProduct = async (req, res) => {
    let data = req.body;
    console.log("req.body");
    console.log(data);
  //   console.log("validate otp data");
  //   console.log(global.userId);
  if(data.productId==undefined || data.productId==""){
    return res.send({success: false ,message: "product Id not found"});
  }
  let response = await admin.updateProduct(data);
  if (response.success) {
    return res.send({ success: true, data: response.data });
  } else {
    return res.send({ success: false, message: response.message });
  }
};

module.exports = { info, getOrders, updateOrderStatus ,updateProduct};
