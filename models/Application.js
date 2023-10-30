import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  heading: String,
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
});

export default mongoose.model("Application", applicationSchema);
