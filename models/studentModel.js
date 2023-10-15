import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    password: {
      type: String,
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batch",
    },
    registerDate: {
      type: Date,
      default: new Date(),
    },
    qualification: {
      type: String,
      default: "",
    },
    yearOfPassing: {
      type: Number,
      default: "",
    },
    yearOfExperience: {
      type: Number,
      default: "",
    },
    noticePeriod: {
      type: Number,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    porfolio: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
    attend: {
      type: Array,
      default: "",
    },
    resetLink: {
      type: String,
    },
    leave:{
      type: Number,
      default: 0,
    },
    refreshToken: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

export default mongoose.model("student", userSchema);
