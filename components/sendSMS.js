const plivo = require("plivo");
const otpCollection = require("../models/auth");
const helperModel = require("../models/helper");

const sendSMS = async (email) => {
  // let isEmailPresent = await otpCollection.checkEmailExist(email);
  let isEmailPresent = await helperModel.checkEmailExist(email, "otp");
  if (isEmailPresent.success) {
    return { success: false, message: isEmailPresent.message };
  }
  // if(typeof isEmailPresent.message!==undefined){
  //   return { success:false, message: "server issue plz try again" };
  // }
  let OTP = genrateOTP(5);
  // let OTP = "54674";
  console.log("OTP" + OTP);
  let dbResponse = await otpCollection.saveOtp({ email: email, otp: OTP });
  console.log("dbResponse in sendSMS");
  console.log(dbResponse);
  if (!dbResponse.success) {
    return { success: false, message: "error from server side" };
  }

  let client = new plivo.Client(
    "MAM2M3NJY5NWYWYWY4MZ",
    "NWJmMmM2YjIyZGMwM2M1MTdiZTdiZDIyYWZiZjNk"
  );
  let response = await client.messages.create({
    src: "+917248314681",
    dst: "+917007524930",
    text: "Hello, from my side your otp is" + OTP,
  });
  console.log("sendSMS");
  console.log(response);
  // return response
  if (response.messageUuid !== undefined && dbResponse.success) {
    return { success: true, data: response.message };
  } else {
    return { success: false, message: "message not created" };
  }

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

const genrateOTP = (n) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

module.exports = { sendSMS };
