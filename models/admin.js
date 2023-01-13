const { Connection } = require("./connection.js");
const getAdmin = async (data) => {
  const collection = Connection.conn.db("test").collection("userdetails");
  let userId = global.userId;
  console.log("in admin models ");
  console.log(userId);

  try {
    let validateResponse = await collection.find({ userId: userId }).toArray();

    console.log("validate Response in models ");
    console.log(validateResponse);
    if (validateResponse.length == 0) {
      return { success: false, message: "data not found" };
    }
    let user_detail = validateResponse[0];
    return { success: true, data: user_detail };
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};
const getAllOrders = async () => {
  const collection = Connection.conn.db("test").collection("orders");
  //   let userId = global.userId;
  //   console.log("in admin models ");
  //   console.log(userId);

  try {
    let Response = await collection.find({}).toArray();

    // console.log("validate Response in models ");
    // console.log(validateResponse);
    // if (validateResponse.length == 0) {
    //   return { success: false, message: "data not found" };
    // }
    // let user_detail = validateResponse[0];
    return { success: true, data: Response };
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};
const updateOrderStatus = async (data) => {
  const collection = Connection.conn.db("test").collection("orders");
  //   let userId = global.userId;
  console.log("in admin models ");
  console.log(data);

  try {
    let Response = await collection.updateOne(
      {
        $and: [
          {
            id: data.orderId,
            userId: data.userId,
          },
        ],
      },
      {
        $set: { status: data.status },
      }
    );

    console.log("validate Response in models ");
    console.log(Response);
    // if (validateResponse.length == 0) {
    //   return { success: false, message: "data not found" };
    // }
    // let user_detail = validateResponse[0];
    if (Response.acknowledged && Response.modifiedCount > 0) {
      return { success: true, data: "update Success" };
    } else {
      return { success: true, data: "already updated " };
    }
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};
const updateProduct = async (data) => {
  const collection = Connection.conn.db("test").collection("products");
  //   let userId = global.userId;
  console.log("in admin models ");
  console.log(data);

  let productId = parseInt(data.productId);
  let price = parseFloat(data.price);
  let discountPercentage = parseFloat(data.discountPercentage);
  let stock = parseInt(data.stock);

  try {
    let Response = await collection.updateOne(
      {
        id: productId,
      },

      {
        $set: {
          price: price,
          discountPercentage: discountPercentage,
          stock: stock,
        },
      }
    );

    console.log("update product Response in models ");
    console.log(Response);
    // if (validateResponse.length == 0) {
    //   return { success: false, message: "data not found" };
    // }
    // let user_detail = validateResponse[0];
    if (Response.acknowledged && Response.modifiedCount > 0) {
      return { success: true, data: "update Success" };
    } else {
      return { success: true, data: "already updated " };
    }
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};

module.exports = { getAdmin, getAllOrders, updateOrderStatus, updateProduct };
