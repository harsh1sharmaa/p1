const auth = require("../components/auth");
const user = require("../components/user");
const sendSms = require("../components/sendSMS");
const sendMail = require("../components/sendMail");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SampleKey";
const register = async (req, res) => {
  let email = req.body.email;
  let validateEmailResponse = auth.validateEmail(email);
  if (!validateEmailResponse) {
    res.send({ success: false, message: "invalid email" });
  }
  // console.log("validateEmailResponse");
  // console.log(validateEmailResponse);
  let userResponse = await user.register(req.body);
  console.log("userResponse in controller");
  console.log(userResponse);
  if (!userResponse.success) {
    res.send({ success: false, message: userResponse.message });
  } else {
    console.log("in else part user controller");
    // let otpResponse = await sendSms.sendSMS(email);
    let mailResponse = await sendMail.sendMail(email);
    console.log("mailResponse in controller");
    console.log(mailResponse);
    if (mailResponse.success) {
      res.send({ success: true, data: "mail send successfully" });
    } else {
      res.send({ success: false, message: mailResponse.message });
    }
    // console.log("inside if otpResponse");
    // console.log(otpResponse);
    // if (otpResponse.success) {
    //   res.send({ success: true, data: "OTP send successfully" });
    // } else {
    //   res.send({ success: false, message: otpResponse.message });
    // }
  }
};

const login = async (req, res) => {
  // let cocke=req.cookies['token'];  // code for getting cookies from frontend
  console.log("in login");
  let email = req.body.email;
  if (!auth.validateEmail(email)) {
    res.send("invalid Email");
  }
  console.log("in user controller");
  console.log(req.body);
  let userValidateResponse = await user.validateUser(req.body);
  console.log("userValidateResponse");
  console.log(userValidateResponse);

  if (!userValidateResponse.success) {
    res.send({ success: false, message: userValidateResponse.message });
  } else {
    console.log("userValidateResponse in controller");
    console.log(userValidateResponse);
    let userId = userValidateResponse.data.userId;
    let role = userValidateResponse.data.role;
    //validate Email with DB Email Address
    if (userValidateResponse.success) {
      let Token = generateAccessToken(email, userId, role);
      res.cookie("token", Token); //set
      res.send({
        success: true,
        data: { message: userValidateResponse.data.message, token: Token },
      });
    } else {
      res.send({ success: false, message: userValidateResponse.message });
    }
  }
};

function generateAccessToken(username, userId, role) {
  return jwt.sign({ email: username, userId: userId, role: role }, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
}

const validateOtp = async (req, res) => {
  let data = req.body;
  console.log("validate otp data");
  console.log(data);
  let response = await auth.validateOtpHelper(data);
  if (response.success) {
    res.send({ success: true, data: response.data });
  } else {
    res.send({ success: false, message: response.message });
  }
};

module.exports = { register, login, validateOtp };
