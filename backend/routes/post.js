import Router from "express-group-router";
import postController from "../controllers/posts/post.js";
import commentController from "../controllers/comment/comment.js";
import replyController from "../controllers/comment/replyComment.js";
import likeController from "../controllers/like/like.js";
import { authenticate } from "../middleware/authMiddleware.js";
import imgUploader from "../utils/imgUploader.js";

const router = new Router();

router.group("/", [authenticate], (router) => {
  router.get("/", postController.getPosts);
  router.get("/:id", postController.getPost);
  router.post("/", imgUploader.array("files", 8), postController.createPost);
  router.put("/:id", imgUploader.array("files", 8), postController.updatePost);
  router.delete("/:id", postController.deletePost);

  // Comments
  router.group("/:id/comment", (router) => {
    router.post("/", commentController.createComment);
    router.put("/:commentId", commentController.updateComment);
    router.delete("/:commentId", commentController.deleteComment);

    //Reply Comment
    router.group("/:commentId", (router) => {
      router.post("/reply", replyController.createReply);
      router.put("/reply", replyController.updateReply);
      router.delete("/reply", replyController.deleteReply);
    });
  });

  // Like & Dislke
  router.put("/:id/like", [authenticate], likeController.likeAndDislike);
});

export default router.init();
