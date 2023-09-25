import mongoose from "mongoose";

var batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "mentor" },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
  ],
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "session",
    },
  ],
});

export default mongoose.model("batch", batchSchema);
