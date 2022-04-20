import Router from "express-group-router";
import userController from "../controllers/clients/user.js";
import { authenticate } from "../middleware/authMiddleware.js";
import imgUploader from "../utils/imgUploader.js";

const router = new Router();

router.group("/", (router) => {
  router.get("/", userController.getUsers);
  router.put("/friend-request", [authenticate], userController.friendRequest);
});

export default router.init();
