const { Connection } = require("./connection.js");
const checkEmailExist = async (email, collectionName) => {
  console.log("in helper function email");
  console.log(email);
  Connection.open();
  if (email.trim().length == 0) {
    return { success: false, message: "email is empty" };
  }
  try {
    const collection = Connection.conn.db("test").collection(collectionName);
    let dbResponse = await collection.find({ email: email }).toArray();
    console.log("dbResponse");
    console.log(dbResponse.length);
    if (dbResponse.length > 0) {
      return { success: true, message: "email already exists" };
    } else {
      return { success: false, message: "email not exists" };
    }
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { success: true, message: error };
    // res.status(500).json({ error });
  }
};

module.exports = { checkEmailExist };
