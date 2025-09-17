import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(authController.signup);
router.route("/login").post(authController.login);

export default router;
