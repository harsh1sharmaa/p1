const { Connection } = require("./connection.js");
const get = async (req, res) => {
  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("otp");
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

const saveOtp = async (data) => {
  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("otp");
    collection.createIndex({ DateTime: 1 }, { expireAfterSeconds: 1 });
    // let isEmailPresent = await collection
    //   .find({ useremail: data.useremail })
    //   .toArray();
    // if (isEmailPresent.length > 0) {
    //   return { success: false, message: "email exit" };
    // }
    let dbResponse = await collection.insertOne({
      DateTime: new Date(),
      ...data,
    });
    console.log("dbResponse");
    console.log(dbResponse);
    if (dbResponse.acknowledged) {
      return { success: true, data: dbResponse };
    } else {
      return { success: false, message: "otp not saved" };
    }
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
    // res.status(500).json({ error });
  }
};

const validateOtp = async (data) => {
  let userEmail = data.email;
  let OTP = parseInt(data.otp);
  console.log("---in validateOtp models ---");
  console.log(userEmail);

  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("otp");
    let validateResponse = await collection
      .find({ email: userEmail, otp: OTP })
      .toArray();

    console.log("validateResponse.length");
    console.log(validateResponse.length);
    if (validateResponse.length > 0) {
      collection.deleteOne({ email: userEmail, otp: OTP });

      return { success: true, data: "otp validate successfully" };
    }
    return { success: false, message: "otp not validate successfully" };
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
    // res.status(500).json({ error });
  }
};

const checkEmailExist = async (email) => {
  console.log(email);
  Connection.open();
  try {
    const collection = Connection.conn.db("test").collection("otp");
    let dbResponse = await collection.find({ useremail: email }).toArray();
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

module.exports = { get, saveOtp, validateOtp, checkEmailExist };
