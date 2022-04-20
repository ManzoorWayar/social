import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your firstName"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please add your lastName"],
      trim: true,
    },
    email: {
      type: String,
      index: {
        unique: true,
      },
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    birthday: {
      type: Date,
      required: [true, "Please add your birthday"],
    },
    media: {
      type: String,
      default: "no-photo.jpg",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: [true, "Please Select your gender"],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    tokenIdentifier: {
      type: String,
      select: false,
    },
    verificationToken: String,
    verificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("fullName").get(function () {
  return this.firstName + this.lastName;
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.isVerified = async function (next) {
  return this.verifiedAt !== null;
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  // this.tokenIdentifier = crypto.randomUUID();
  // this.save();

  return jwt.sign(
    { id: this._id, tokenIdentifier: this.tokenIdentifier },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

// Generate & hash verification token
UserSchema.methods.getVerificationToken = function () {
  const verifyToken = crypto.randomBytes(10).toString("hex");

  // Hash token and set to verificationToken field
  this.verificationToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  this.verificationExpire = Date.now() + 10 * 60 * 1000;

  return verifyToken;
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

export default User;
