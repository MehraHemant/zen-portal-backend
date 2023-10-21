import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
  {
    activities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "activities",
    },
    answer: {
      githubClient: String,
      githubServer: String,
      deployedClient: String,
      deployedServer: String,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    marks: Number,
    comment: String,
    totalMarks: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

export default mongoose.model("answer", answerSchema);
