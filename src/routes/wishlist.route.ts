import express from "express";
import wishlistController from "../controllers/wishlist.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, wishlistController.addHotel)
  .delete(authMiddleware, wishlistController.removeHotel);
router.route("/:userId").get(authMiddleware, wishlistController.getWishlist);

export default router;
