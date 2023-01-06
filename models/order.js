const { Connection } = require("./connection.js");
const helper = require("../components/helper");
const get = async (req, res) => {
  Connection.open();
  try {
    userId = global.userId;
    console.log("userId")
    console.log(userId)
    const collection = Connection.conn.db("test").collection("orders");
    const result = await collection.find({ userId: userId }).toArray();
    console.log(result);
    return { success: true, data: result };
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
    // res.status(500).json({ error });
  }
};
const getSingleOrder = async (orderId) => {

  console.log("data in orrder ");
  console.log(orderId);
  userId = global.userId;

  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("orders");
    const result = await collection
      .find({ id: orderId, userId: userId })
      .toArray();
    console.log(result);
    return { success: true, data: result };
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
    // res.status(500).json({ error });
  }
};
const create = async (data) => {

  let uniqueOrderId = helper.createUUID(5);
  // console.log(uniqueOrderId);
  let totelPrice=0;
  for(let i = 0; i < data['items'].length; i++) {
    totelPrice=totelPrice+parseInt(data['items'][i].price)*parseInt(data['items'][i].quantity);
  }
  console.log(data);
  let userId = global.userId;
  let email = global.email;
  let orderData = {
    status: "pending",
    id: uniqueOrderId,
    userId: userId,
    userEmail: email,
    item: data['items'],
    totelPrice: totelPrice
  };
  // console.log("userId");
  // console.log(userId);
  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("orders");
    const result = await collection.insertOne(orderData);
    // console.log("result in order create");
    // console.log(result);
    return { success: true, data: { orderId: uniqueOrderId } };
    // res.json({ result: result });
  } catch (error) {
    // console.log(error);
    return { success: false, message: error };
    // res.status(500).json({ error });
  }
};

module.exports = { get, create, getSingleOrder };
