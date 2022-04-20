import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";

// @desc    Create Reply Comment
// @route   POST /posts/:id/comment/commentId/reply
// @access  private
const createReply = asyncHandler(
  async ({ body, user, params: { id, commentId } }, res) => {
    const post = await Post.findById(id);

    if (!post || post.deletedAt !== undefined) {
      res.status(404);
      throw new Error("Post not found");
    }

    const replyComment = {
      user: user._id,
      content: body.content,
      replyTo: commentId,
    };

    await Post.findOneAndUpdate(
      { _id: id },
      {
        $push: { comments: replyComment },
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ msg: "Reply Comment was created successfully" });
  }
);

// @desc    Update comment
// @route   PUT /posts/:id/comment/:commentId/reply
// @access  Private
const updateReply = asyncHandler(
  async ({ user, body, params: { id, commentId } }, res) => {
    let post = await Post.findById(id);

    if (!post || post.deletedAt !== undefined) {
      res.status(404);
      throw new Error("Post not found");
    }

    // Pull out comment
    let comment = post.comments.find((comment) => comment.id === commentId);

    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }

    // Make sure users is owner
    if (comment.user?.toString() !== user.id) {
      res.status(401);
      throw new Error("You are not authorized to update this comment");
    }

    // Update specific comment
    await Post.updateOne(
      { "comments._id": commentId },
      {
        $set: {
          "comments.$.user": user.id,
          "comments.$.content": body.content,
        },
      }
    );

    res.status(200).json({ msg: "Comment was updated successfully" });
  }
);

// @desc    Delete comment
// @route   PUT /posts/:id/comment/:commentId/reply
// @access  Private
const deleteReply = asyncHandler(
  async ({ user, params: { id, commentId } }, res) => {
    const post = await Post.findById(id);

    if (!post || post.deletedAt !== undefined) {
      res.status(404);
      throw new Error("Post not found");
    }

    // Pull out comment
    const comment = post.comments.find((comment) => comment.id === commentId);

    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }

    // Make sure users is owner
    if (comment.user?.toString() !== user.id) {
      res.status(401);
      throw new Error("You are not authorized to delete this comment");
    }

    // Remove specific comment
    await post.updateOne({ $pull: { comments: { _id: commentId } } });

    res.status(200).json({ msg: "Comment was deleted successfully" });
  }
);

export default {
  createReply,
  updateReply,
  deleteReply,
};
