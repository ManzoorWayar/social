import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

// @desc      Get all users
// @route     GET /users
// @access    public
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ deletedAt: undefined });

  res.json({ length: users.length, users });
});

// @desc      Get single user
// @route     GET /users/:id
// @access    public
const getUser = asyncHandler(async ({ params: { id } }, res, next) => {
  const user = await User.findById(id);

  if (!user || user.deletedAt !== undefined) {
    res.status(400);
    throw new Error("Post Not Found");
  }

  res.json({ user });
});

// @desc    Create a user
// @route   POST /user/register
// @access  private
const createUser = asyncHandler(async ({ body, user, files }, res, next) => {});

// @desc    Update a post
// @route   PUT /user/register/:id
// @access  Private
const updateUser = asyncHandler(
  async ({ user, params: { id } }, res, next) => {}
);

// @desc    Delete a post
// @route   DELETE /user/register/:id
// @access  Private
const deleteUser = asyncHandler(
  async ({ user, params: { id } }, res, next) => {}
);

// @desc    Follow/Unfollow a user
// @route   PUT /user/:id/frient-request
// @access  Private
const friendRequest = asyncHandler(
  async ({ user, body: { followerID } }, res, next) => {
    if (followerID === user.id) {
      res.status(400);
      throw new Error("you cant follow yourself");
    }

    const otherUser = await User.findById(followerID);

    if (!otherUser) {
      res.status(404);
      throw new Error("Something went wrong!");
    }

    const isFollow = otherUser.followers.find(
      (follower) => follower === user.id
    );

    if (!isFollow) {
      await user.updateOne({ $push: { followings: followerID } });
      await otherUser.updateOne({ $push: { followers: user.id } });

      res.status(200).json({ msg: "user has been followed" });
    } else {
      await user.updateOne({ $pull: { followings: followerID } });
      await otherUser.updateOne({ $pull: { followers: user.id } });

      res.status(200).json({ msg: "user has been unFollowed" });
    }
  }
);

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  friendRequest,
};
