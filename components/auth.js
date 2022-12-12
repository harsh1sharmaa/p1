const otpCollection = require("../models/auth");
const userModel = require("../models/user");
const validateEmail = function (email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

const validateOtpHelper = async (data) => {
  let email = data.email;
  if (!validateEmail(email)) {
    return { success: false, message: "invalid email" };
  }
  console.log("---in validateOtpHelper ---");
  otpValidateResponse = await otpCollection.validateOtp(data);
  if (otpValidateResponse.success) {
    let updateResponse = await userModel.updateUserStatus(email, "active");
    if (!updateResponse.success) {
      return { success: false, message: updateResponse.message };
    }
    return { success: true, data: otpValidateResponse.data };
  } else {
    return { success: false, message: otpValidateResponse.message };
  }
};

module.exports = { validateEmail, validateOtpHelper };
