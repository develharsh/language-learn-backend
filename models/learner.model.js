const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Country: { type: String, required: true, trim: true },
    State: { type: String, required: true, trim: true },
    City: { type: String, required: true, trim: true },
    Email: { type: String, required: true, trim: true, unique: true },
    Phone: { type: String, required: true, trim: true, unique: true }, //combined countrycode
    CountryCode: { type: String, required: true, trim: true },
    PartialPhone: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Learner || mongoose.model("Learner", learnerSchema);
