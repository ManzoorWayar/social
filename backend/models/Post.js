import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      index: true,
      trim: true,
    },
    media: {
      type: Array,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        replyTo: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          default: null,
        },
      },
    ],
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
