const learnerModel = require("../models/learner.model");
const enrollmentModel = require("../models/enrollment.model");
const { CourseIdsEnum } = require("../utils/hardcoded");

module.exports.register = async (req, res) => {
  try {
    if (!req.body.Name) throw { message: "Name is missing", code: 400 };
    if (!req.body.Country) throw { message: "Country is missing", code: 400 };
    if (!req.body.State) throw { message: "State is missing", code: 400 };
    if (!req.body.City) throw { message: "City is missing", code: 400 };
    if (!req.body.Email) throw { message: "Email is missing", code: 400 };
    if (!req.body.CountryCode)
      throw { message: "Country Code is missing", code: 400 };
    if (!req.body.Phone) throw { message: "Phone is missing", code: 400 };
    if (!req.body.EnrollingFor)
      throw { message: "Enrolling For is missing", code: 400 };
    if (!CourseIdsEnum.includes(req.body.EnrollingFor))
      throw { message: "Enrolling For is invalid", code: 500 };
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
    const enrolled = await enrollmentModel.create({
      LearnerId: user._id,
      Course: req.body.EnrollingFor,
    });
    const sendEmail = require("../utils/sendEmail");
    sendEmail("event", {
      message:
        `New Learner Onboarded: ${user.Name}, ${user.Country}, ` +
        `${user.State}, ${user.City}, ${user.Email}, ${user.Phone}, ${user._id}, ${enrolled.Course}`,
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
