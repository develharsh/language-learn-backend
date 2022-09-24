const learnerModel = require("../models/learner.model");
const enrollmentModel = require("../models/enrollment.model");
const { isEmail, isPhone } = require("../utils/hardcoded");
// const { CourseIdsEnum } = require("../utils/hardcoded");

module.exports.register = async (req, res) => {
  try {
    if (!req.body.Name) throw { message: "Name is missing", code: 400 };
    if (!req.body.Email) throw { message: "Email is missing", code: 400 };
    if (!isEmail(req.body.Email))
      throw { message: "Email is invalid", code: 400 };
    if (!req.body.CountryCode)
      throw { message: "Country Code is missing", code: 400 };
    if (!req.body.Phone) throw { message: "Phone is missing", code: 400 };
    if (!isPhone(req.body.Phone))
      throw { message: "Phone must be 10 Digit Long", code: 400 };
    let anyUser;
    anyUser = await learnerModel.findOne({ Email: req.body.Email });
    if (anyUser) throw { message: "Email Already Exists", code: 500 };
    anyUser = await learnerModel.findOne({
      Phone: `${req.body.CountryCode}${req.body.Phone}`,
    });
    if (anyUser) throw { message: "Phone Already Exists", code: 500 };
    //modification
    req.body.PartialPhone = req.body.Phone;
    req.body.Phone = `${req.body.CountryCode}${req.body.Phone}`;

    const user = await learnerModel.create(req.body);
    enrollmentModel.create({
      LearnerId: user._id,
      Course: "ENGLISH",
    });
    const sendEmail = require("../utils/sendEmail");
    sendEmail("event", {
      message: `New Learner Onboarded: ${user.Name}, ${user.Email}, ${user.Phone}, ${user._id}`,
      email: "harshvsingh.223@gmail.com,kjlsingh.223@gmail.com",
    });
    res.status(201).json({
      success: true,
      message: "Enrolled Successfully",
    });
  } catch (error) {
    res.status(error.code).json({ success: false, message: error.message });
  }
};
