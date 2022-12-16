const helper = require("../components/helper");
const { Connection } = require("./connection.js");

const saveUser = async (data) => {
  console.log("data in models");
  console.log(data);
  let email = data.email;
  let password = data.password;
  let name = data.name;
  let mobile = data.phone;
  Connection.open();
  password = await helper.hashPassword(password);
  if (password === undefined) {
    return { success: false, message: "some error" };
  }
  let UUID = helper.createUUID(15);
  console.log(UUID);
  console.log("in models password hash");
  console.log(password);
  try {
    const collection = Connection.conn.db("test").collection("userdetails");
    const dbResponse = await collection.insertOne({
      userId: UUID,
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      userstatus: "inactive",
      role: "user",
    });
    if (dbResponse.acknowledged) {
      return { success: true, data: dbResponse };
    } else {
      return { success: false, message: "User not saved" };
    }
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};

const updateUserStatus = async (email, status) => {
  console.log(status);
  console.log(email);
  try {
    const collection = Connection.conn.db("test").collection("userdetails");
    const dbResponse = await collection.updateOne(
      { email: email },
      {
        $set: {
          userstatus: status,
        },
      }
    );

    console.log("user update");
    console.log(dbResponse);

    if (dbResponse !== undefined && dbResponse.acknowledged) {
      return { success: true, data: dbResponse };
    } else {
      return { success: false, message: "User not Update" };
    }
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};

const validateLogin = async (data) => {
  const collection = Connection.conn.db("test").collection("userdetails");
  let email = data.email;
  let password = data.password;
  password = await helper.hashPassword(password);
  console.log("in models password hash");
  console.log(password);
  try {
    let validateResponse = await collection.find({ email: email }).toArray();

    console.log("validate Response in models ");
    console.log(validateResponse);
    if (validateResponse.length == 0) {
      return { success: false, message: "login fail" };
    }
    let user_detail = validateResponse[0];
    let user_id = user_detail.userId;
    let role = user_detail.role;
    global.userId = user_id;
    let db_password = user_detail.password;

    if (db_password.localeCompare(password)) {
      console.log("password match");
      return {
        success: true,
        data: { message: "login success", userId: user_id, role: role },
      };
    } else {
      return { success: false, message: "login fail" };
    }

    // if (validateResponse.length > 0) {
    //   return { success: true, data: "login success" };
    // } else {
    // }
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};

module.exports = { saveUser, updateUserStatus, validateLogin };
