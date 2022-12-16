const sgMail = require("@sendgrid/mail");
const otpCollection = require("../models/auth");
const nodemailer = require("nodemailer");


/**
 * this funtion send mail for OTP
 * @param {*} email 
 * @returns 
 */
const sendMail = async (email) => {
  // sgMail.setApiKey(
  //   "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"
  // );
  // const msg = {
  //   to: "harsharma647@gmail.com",
  //   from: "harshsharma541998@gmail.com", // Use the email address or domain you verified above
  //   subject: "Sending with Twilio SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };
  // try {
  //   let response = await sgMail.send(msg);
  //   console.log("send mail response");
  //   console.log(response);
  //   return { success: true, data: response };
  // } catch (error) {
  //   return { success: false, message: error.message };
  // }
  // sgMail.setApiKey(
  //   "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"
  // );
  // const msg = {
  //   to: "harsharma647@gmail.com",
  //   from: "harshsharma541998@gmail.com", // Use the email address or domain you verified above
  //   subject: "Sending with Twilio SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };
  // // sgMail.send(msg);
  // try {
  //   let response = await sgMail.send(msg);
  //   console.log("send mail response");
  //   console.log(response);
  //   return { success: true, data: response };
  // } catch (error) {
  //   return { success: false, message: error.message };
  // }

  //----------------------------------------------------------------
  let OTP = genrateOTP(5);
  // let OTP = "54674";
  console.log("OTP" + OTP);
  let dbResponse = await otpCollection.saveOtp({ email: email, otp: OTP });
  console.log("dbResponse in sendSMS");
  console.log(dbResponse);
  if(dbResponse===undefined){
    return { success: false, message: "error in save Otp"}
  }
  if (!dbResponse.success) {
    return { success: false, message: "error from server side" };
  }

  // -----------
  const transport = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,
    // requireTLS: true,
    host:'mail.cedcommerce.com',
    port: 465,
  secure: true,
    auth: {
      user: "harshsharma@cedcommerce.com",
      pass: "Harsh17044@123",
    },
  });

  let mailOptions = {
    from: "harshsharma@cedcommerce.com",
    to: "harshsharma541998@gmail.com",
    subject: "message from harsh sharma",
    text: "hello from node server yout OTP is => " + OTP,
  };
  try {
    let response = await transport.sendMail(mailOptions);
    console.log("---------------------response--------------------------------");
    console.log(response);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error };
  }
};

const genrateOTP = (n) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

module.exports = { sendMail };
