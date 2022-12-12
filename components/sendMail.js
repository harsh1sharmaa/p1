const sgMail = require("@sendgrid/mail");

const sendMail = async () => {
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: "harsharma647@gmail.com",
    from: "harshsharma541998@gmail.com", // Use the email address or domain you verified above
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  try {
    let response = await sgMail.send(msg);
    console.log("send mail response");
    console.log(response);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = { sendMail };
