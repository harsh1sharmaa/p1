const validateEmail = require("../components/auth");
const register = (req, res) => {
  let email = req.body.email;
  if (validateEmail.validateEmail(email)) {
    res.send("send otp successfully");
  } else {
    res.send("invalid Email");
  }
};

const login = (req, res) => {
    let email = req.body.email
  if (!validateEmail.validateEmail(email)) {
    res.send("invalid Email");
  }
  //validate Email with DB Email Address
  if(validateEmail.validateEmail(email)){
       res.send({"success": true, "data":"user login success"});
  }else{
    res.send({"success": false, "data":"login fail"});
  }
};

module.exports = { register, login };
