module.exports.sendmail = async (req, res) => {
  try {
    const sendEmail = require("../utils/sendEmail");
    sendEmail(req.params.type, {
      message: req.body.message,
      email: "harshvsingh.223@gmail.com,kjlsingh.223@gmail.com",
    });
    res.status(200).json({ success: true, message: "Email Alert was sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
