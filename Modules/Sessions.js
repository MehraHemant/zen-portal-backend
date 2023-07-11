import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  sessionType: {
    type: String,
    required: true,
    default: "additional",
  },
  title: { type: String, required: true},
  time: { type: String },
  contents: { type: [String] },
  pre_read: { type: [String] },
  activities: { type: [String] },
  batch: { type: [String] },
  commpleted: { type: Boolean, required:true, default: false },
});

export default mongoose.model("session", sessionSchema);
