const plivo = require("plivo");
const otpCollection = require("../models/auth");
const helperModel = require("../models/helper");

/**
 * this funtion send OTP to mobile Number
 * @param {*} Phone
 * @param {*} email
 * @returns
 */
const sendSMS = async (Phone, email) => {
  let OTP = genrateOTP(5);
  // let OTP = "54674";
  console.log("OTP" + OTP);
  // let isEmailPresent = await otpCollection.checkEmailExist(email);
  let isEmailPresent = await helperModel.checkEmailExist(email, "otp", {});
  console.log("isEmailPresent", isEmailPresent);
  if (isEmailPresent === undefined) {
    return { success: false, message: "error in Check Email" };
  }
  let dbResponse;
  if (isEmailPresent.success) {
    // return { success: false, message: isEmailPresent.message };
    dbResponse = await otpCollection.updateOTP({ email: email, otp: OTP });
  } else {
    dbResponse = await otpCollection.saveOtp({ email: email, otp: OTP });
  }
  console.log("dbResponse in sendSMS");
  console.log(dbResponse);
  if (isEmailPresent === undefined) {
    return { success: false, message: "error in Check Email" };
  }
  if (!dbResponse.success) {
    return { success: false, message: "error from server side" };
  }
  console.log(Phone);
  // return { success: true, data: "send" };
  let client = new plivo.Client(
    "MAM2M3NJY5NWYWYWY4MZ",
    "NWJmMmM2YjIyZGMwM2M1MTdiZTdiZDIyYWZiZjNk"
  );
  try {
    let response = await client.messages.create({
      src: "+917248314681",
      dst: Phone,
      text: "Hello, from my side your otp is" + OTP,
    });
    if (response.messageUuid !== undefined && dbResponse.success) {
      return { success: true, data: response.message };
    } else {
      return { success: false, message: "message not created" };
    }
  } catch (error) {
    return { success: false, message: error };
  }
  // console.log("sendSMS");
  // console.log(response);
  // return response

  // .then(function (message_created) {
  //   console.log("message_created");
  //   console.log(message_created.messageUuid);
  //   if (message_created.messageUuid !== undefined) {
  //     return { success: true, data: message_created.message };
  //   }else{
  //     return { success: false, message: "message not created" };
  //   }
  // });
};

/**
 * this funtion genrate Random OTP
 * @param {*} n
 * @returns
 */
const genrateOTP = (n) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

module.exports = { sendSMS };
