const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
    },
    // Country: { type: String, default: "IN" },
    // State: { type: String, required: true, trim: true },
    // City: { type: String, required: true, trim: true },
    Email: { type: String, trim: true, unique: true },
    Phone: { type: String, trim: true, unique: true },
    CountryCode: { type: String, trim: true },
    PartialPhone: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Learner || mongoose.model("Learner", learnerSchema);
