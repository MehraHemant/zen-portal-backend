import mongoose from "mongoose";

var activitySchema = new mongoose.Schema({
  title: String,
  session: { type: mongoose.Schema.Types.ObjectId, ref: "session" },
  type: {
    type: String,
    default: "task",
  },
  tags: [
    {
      type: String,
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer",
    },
  ],
  comment: String,
  marks: Number,
});

export default mongoose.model("activities", activitySchema);
