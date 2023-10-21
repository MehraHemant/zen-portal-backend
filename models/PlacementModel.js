import mongoose from "mongoose";

const placementSchema = mongoose.Schema({
  name: String,
  batch: String,
  company: String,
  course: String,
  ctc: String,
  placedThrough: String,
});

export default mongoose.model("PlacementBoard", placementSchema);
