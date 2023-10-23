import mongoose from "mongoose";

var activitySchema = new mongoose.Schema({
  title: String,
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "session",
  },
  type: {
    type: String,
    enum: ["capstone", "webcode", "webcode", "task"],
    default: "task",
  },
  tags: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  requirements: [
    {
      type: String,
    },
  ],
  terms: [
    {
      type: String,
    },
  ],
  refrence: [
    {
      type: String,
    },
  ],
  comments: String,
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer",
    },
  ],
});

export default mongoose.model("activities", activitySchema);
