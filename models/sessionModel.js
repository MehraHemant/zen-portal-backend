import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    day: Number,
    sessionType: {
      type: String,
      required: true,
      default: "roadmap",
      enum: ["roadmap", "additional"],
    },
    title: {
      type: String,
      required: true,
    },
    contents: [
      {
        type: String,
      },
    ],
    pre_read: [
      {
        type: String,
      },
    ],
    leaves: {type:Number, default: 0},
    activities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "activities",
    },
    sessionLink: {
      type: String,
    },
    batch: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
      },
    ],
    commpleted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("session", sessionSchema);
