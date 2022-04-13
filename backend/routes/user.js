import Router from "express-group-router";
import authController from "../controllers/clients/auth.js";
import { authenticate } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import imgUploader from "../utils/imgUploader.js";

const router = new Router();

router.group("/", (router) => {
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/logout", authController.logout);
  router.put("/verification", authController.verification);
  router.post("/forgotPassword", authController.forgotPassword);
  router.put("/resetpassword/:resettoken", authController.resetPassword);

  router.group([authenticate(User)], (router) => {
    // router.get("/me", profileController.getUser);
    // router.put("/:id", profileController.updateUser);
    // router.delete("/:id", profileController.deleteUser);
  });
});

export default router.init();
