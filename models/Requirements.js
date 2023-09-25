import mongoose from "mongoose";

const requirementSchema = mongoose.Schema(
  {
    name: String,
    website: String,
    role: String,
    ctc: Number,
    natureOfJob: String,
    openings: Number,
    deadline: Date,
    program: String,
    jd: String,
  },
  { timestamps: true }
);

export default mongoose.model("requirements", requirementSchema);