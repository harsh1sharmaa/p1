const user = require("../models/user");
const helperModel = require("../models/helper");
const register = async (data) => {
  let isUserPresent = await helperModel.checkEmailExist(
    data.email,
    "userdetails"
  );
  console.log("isUserPresent");
  console.log(isUserPresent);

  if (isUserPresent.success) {
    return { success: false, message: isUserPresent.message };
  }
  let response = await user.saveUser(data);

  console.log("response in componet");
  console.log(response);
  if (response.success) {
    return { success: true, data: response.data };
  } else {
    return { success: true, data: response.message };
  }
};

const validateUser = async (data) => {
  let userResponse = await user.validateLogin(data);
  if (userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};

module.exports = { register, validateUser };