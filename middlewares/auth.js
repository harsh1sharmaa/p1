
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SampleKey";

const globalMiddleware = (req, res, next) => {
  // global.userId="4444444";

  // let coocke = req.cookies["token"];
  console.log("request");
  // console.log(JSON.stringify(req.headers.authorization));
  // const authHeader = JSON.stringify(req.headers.authorization);
  const tokenHeader = req.headers["authorization"];
  if (tokenHeader === undefined) {
    return res.json({ success: false, message: "Token not found." });
  }
  console.log("tokenHeader");
  console.log(tokenHeader);

  const token2 = tokenHeader.split(" ")[1];
  console.log("tokenVerify:", token2);
  try {
    jwt.verify(token2, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("error:", err);
        return res.json({ message: "Invalid Token." });
      } else {
        // console.log("decoded----");
        // console.log(decoded.userId);
        user_id = decoded.userId;
        email = decoded.email;
        global.userId = user_id;
        global.email = email;
        // req.decoded = decoded;
        next();
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
  // process.exit();
  // const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);

  // if (token == null) return res.sendStatus(401);

  // jwt.verify(token, SECRET_KEY,  (err, user) => {
  //   console.log("err");
  //   console.log(err);
  //   if (err) return res.sendStatus(403);

  //   // req.user = user
  //   console.log(user);

  //   next();
  // });
  // next();
};

const adminMiddleware = (req, res, next) => {
  console.log("request");
  // console.log(JSON.stringify(req.headers.authorization));
  // const authHeader = JSON.stringify(req.headers.authorization);
  const tokenHeader = req.headers["authorization"];
  console.log("tokenHeader");
  console.log(tokenHeader);

  const token2 = tokenHeader.split(" ")[1];
  console.log("tokenVerify:", token2);
  try {
    jwt.verify(token2, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("error:", err);
        return res.json({ success: "true", message: "Invalid Token." });
      } else {
        console.log("decoded----");
        console.log(decoded);
        user_id = decoded.userId;
        email = decoded.email;
        role = decoded.role;
        global.userId = user_id;
        global.email = email;
        // req.decoded = decoded;
        if (role == "admin") {
          next();
        } else {
          return res.json({ success: "true", message: "not authorized" });
        }
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = { globalMiddleware, adminMiddleware };
