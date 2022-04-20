import Router from "express-group-router";
import postController from "../controllers/posts/post.js";
import { authenticate } from "../middleware/authMiddleware.js";
import imgUploader from "../utils/imgUploader.js";

const router = new Router();

router.group("/", [authenticate], (router) => {
  router.get("/", postController.getPosts);
  router.get("/:id", postController.getPost);
  router.post("/", imgUploader.array("files", 8), postController.createPost);
  router.put("/:id", imgUploader.array("files", 8), postController.updatePost);
  router.delete("/:id", postController.deletePost);
});

export default router.init();
