import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";

// @route    PUT /posts/:id/like
// @desc     Like a post
// @access   Private
const likeAndDislike = asyncHandler(
  async ({ user, params: { id } }, res, next) => {
    let post = await Post.findById(id);

    if (!post || post.deletedAt !== undefined) {
      res.status(404);
      throw new Error("Post not found");
    }

    // Check if the post has already been liked
    const isLiked = post.likes.some((like) => like.user.toString() === user.id);

    if (!isLiked) {
      await post.updateOne({ $push: { likes: { user: user._id } } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: { user: user._id } } });
      res.status(200).json("The post has been disliked");
    }
  }
);

export default { likeAndDislike };
