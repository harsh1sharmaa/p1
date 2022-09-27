const get = async (req, res) => {
  const { Connection } = require("./connection.js");

  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("products");
    const result = await collection.find({}).toArray();
    console.log(result);
    return { sucess: true, data: result };
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};

module.exports = { get };
