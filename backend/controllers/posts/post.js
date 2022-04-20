import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";

// @desc      Get all posts
// @route     GET /posts
// @access    public
const getPosts = asyncHandler(async (_, res, next) => {
  const posts = await Post.find({ deletedAt: undefined })
    .populate("user", "fullName media createdAt") // Post's Creator
    .populate("comments.user", "fullName media createdAt");

  res.json({ length: posts.length, posts });
});

// @desc      Get single post
// @route     GET /posts/:id
// @access    public
const getPost = asyncHandler(async ({ params: { id } }, res, next) => {
  const post = await Post.findById(id)
    .populate("user", "fullName media") // Post's Creator
    .populate("comments.user", "fullName media");

  if (!post || post.deletedAt !== undefined) {
    res.status(400);
    throw new Error("Post Not Found");
  }

  res.json({ post });
});

// @desc    Create a post
// @route   POST /post
// @access  private
const createPost = asyncHandler(async ({ body, user, files }, res, next) => {
  body.user = user.id;

  body.media = files ? files?.map((file) => file.filename) : undefined;

  const post = await Post.create(body);

  res.status(201).json({ post });
});

// @desc    Update a post
// @route   PUT /post/:id
// @access  Private
const updatePost = asyncHandler(
  async ({ user, body, files, params }, res, next) => {
    let post = await Post.findById(params.id);

    if (!post || post.deletedAt !== undefined) {
      res.status(404);
      throw new Error("Post not found");
    }

    // Make sure users is owner
    if (post.user.toString() !== user.id) {
      res.status(401);
      throw new Error("You are not authorized to update this post");
    }

    body.media = files ? files?.map((file) => file.filename) : undefined;

    delete body["deletedAt"];

    post = await Post.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ post });
  }
);

// @desc    Delete a post
// @route   DELETE /post/:id
// @access  Private
const deletePost = asyncHandler(async ({ user, params: { id } }, res, next) => {
  const post = await Post.findById(id);

  if (!post || post.deletedAt !== undefined) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Make sure users is owner
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error("You are not authorized to update this post");
  }

  post.deletedAt = new Date();
  await post.save();

  res.status(200).json({ msg: "Post was deleted successfully" });
});

export default { getPosts, getPost, createPost, updatePost, deletePost };