const { Connection } = require("./connection.js");
const get = async (req, res) => {

  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("products");
    const result = await collection.find({}).toArray();
    // console.log(result);
    // console.log("global.userId");
    // console.log(global.userId);
    return { success: true, data: result };
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
    // res.status(500).json({ error });
  }
};
const getSingleProduct = async (data) => {
  console.log(data);
  let productId = parseInt(data.productId);
  // const { Connection } = require("./connection.js");
  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("products");
    const result = await collection.find({ id: productId }).toArray();
    // console.log(result);
    
    if (result.length > 0) {
      return { success: true, data: result };
    } else {
      return { success: true, data: [] };
    }
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
    // res.status(500).json({ error });
  }
};

module.exports = { get, getSingleProduct };
