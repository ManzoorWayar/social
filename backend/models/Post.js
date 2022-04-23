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
    status: {
      type: String,
      enum: ["public", "friends"],
      default: "public",
      required: true,
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

// Static method to get avg rating and save
PostSchema.statics.getTimelines = async function (bootcampId) {
  const obj = await this.aggregate([]);
};

const Post = mongoose.model("Post", PostSchema);

export default Post;
