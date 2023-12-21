const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  resume_data: {
    type: Object,
    required: true,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
