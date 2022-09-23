const mongoose = require("mongoose");
const { CourseIdsEnum } = require("../utils/hardcoded");

const enrollmentSchema = new mongoose.Schema(
  {
    Course: {
      type: String,
      required: true,
      enum: CourseIdsEnum,
    },
    LearnerId: {
      type: mongoose.Types.ObjectId,
      ref: "Learner",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
