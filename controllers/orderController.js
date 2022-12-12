const orderComponent = require("../components/order");
const getOrders = async (req, res) => {
  // res.send("hello world!");
  let response = await orderComponent.getOrders();
  if (response.success == true) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, data: response.message });
  }
};
const getSingleOrder = async (req, res) => {
    let data = req.params;
    // console.log("data in order controller");
    // console.log(data);
    let response = await orderComponent.getSingleOrder(data);
    if (response.success) {
      res.send({ success: true, data: response.data });
    } else {
      res.send({ success: false, message: response.message });
    }
};
const createOrder = async (req, res) => {
  // res.send("hello world!");
  let data = req.body;
  let response = await orderComponent.createOrder(data);
  if (response.success) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, message: response.message });
  }
//   res.send(orderComponent.createOrder(data));
};

module.exports = { getOrders,getSingleOrder,createOrder };
