import mongoose, { Model } from "mongoose";
import { IWishlist } from "../types/index.js";

const wishlistSchema = new mongoose.Schema<IWishlist>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotels: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
    default: [],
  },
});

const Wishlist = mongoose.model<IWishlist, Model<IWishlist>>(
  "Wishlist",
  wishlistSchema
);

export default Wishlist;
