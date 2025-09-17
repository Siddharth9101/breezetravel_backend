import express from "express";
import wishlistController from "../controllers/wishlist.controller.js";

const router = express.Router();

router
  .route("/")
  .post(wishlistController.addHotel)
  .delete(wishlistController.removeHotel);
router.route("/:userId").get(wishlistController.getWishlist);

export default router;
