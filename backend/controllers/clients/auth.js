import asyncHandler from "express-async-handler";
import crypto from "crypto";
import User from "../../models/User.js";
import sendMail from "../../utils/sendMail.js";

// @desc    Register new users
// @route   POST user/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { firstName, email, year, month, day, ...rest } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    email,
    ...rest,
    image: "no-image.png",
    verifiedAt: undefined,
    birthday: new Date(year, month, day),
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  accountVerification(res, user, email);
});

// @desc    Auth users & get token
// @route   POST /api/v1/User/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide an email and password");
  }

  // Check for admin
  let user = await User.findOne({
    $or: [{ email: email }, { username: email }],
  }).select("+password");

  // Check for User-users
  user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(403);
    throw new Error("Invalid credentials", 401);
  }

  // Check for verified-users
  const isVerified = await user.isVerified();

  if (!isVerified) {
    res.status(403);
    throw new Error("Invalid credentials", 401);
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(403);
    throw new Error("Invalid credentials", 401);
  }

  const message = `Welcome back to your ${process.env.APP_NAME} account!`;

  sendTokenResponse(user, 200, res, message);
});

// @desc      Log users out / clear cookie
// @route     GET /api/v1/User/logout
// @access    Private
const logout = asyncHandler(async (req, res, next) => {
  // req.user.tokenIdentifier = undefined;
  // await req.user.save();

  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    msg: "Logout out",
  });
});

// @desc      Forgot password
// @route     POST /api/v1/User/forgotpassword
// @access    Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400);
    throw new Error("Email Not Found!");
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;

  const message = `You has requested the reset password for your account: \n\n ${resetUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({
      success: true,
      data: `Email has been sent to your ${user.email} account`,
    });
    return;
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(400);
    throw new Error("Email could not be sent", 500);
  }
});

// @desc      Verify verfication token
// @route     PUT /api/v1/User/verification
// @access    Public
const verification = asyncHandler(
  async ({ body: { verifyToken } }, res, next) => {
    // Get hashed token
    const verificationToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    const user = await User.findOne({
      verificationToken,
      verificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error("Verification is not valid!");
    }

    user.verifiedAt = new Date();
    user.verificationToken = undefined;
    user.verificationExpire = undefined;
    await user.save();

    const message = `Your ${process.env.APP_NAME} account have been successfully created`;

    return sendTokenResponse(user, 200, res, message);
  }
);

// @desc      Reset password
// @route     PUT /api/v1/User/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async ({ params, body }, res, next) => {
  const { newPassword, confirmPassword } = body;

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid data, Password dosen't changed!");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Confirm-Password does not match");
  } else {
    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
  }

  res.status(200).json({ msg: "Password has been changed successfully" });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, message) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        image: user.image,
        gender: user.gender,
        verifiedAt: user.verifiedAt,
        token,
      },
      message,
    });
};

// Send verification via email & send Token Response
const accountVerification = async (res, user, email) => {
  const verifyToken = user.getVerificationToken();
  await user.save({ validateBeforeSave: false });

  const message = `Please verify your ${process.env.APP_NAME} account, Verification code is: ${verifyToken} `;

  try {
    await sendMail({
      email,
      subject: `Your ${process.env.APP_NAME} Account Verification!`,
      message,
    });

    res.status(200).json({
      msg: `Please check your email to verfiy your ${process.env.APP_NAME} account!`,
    });

    return;
  } catch (err) {
    user.verificationToken = undefined;
    user.verificationExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(400);
    throw new Error("Email could not be sent", 500);
  }
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  verification,
  resetPassword,
};
