import z from "zod";
import { wishlistSchema } from "../schemas/wishlist.schema.js";
import Wishlist from "../models/wishlist.model.js";

class WishlistService {
  async addHotel(data: z.infer<typeof wishlistSchema>) {
    await Wishlist.findOneAndUpdate(
      { userId: data.userId },
      { $addToSet: { hotels: data.hotelId } },
      { upsert: true, new: true }
    );
    return;
  }

  async removeHotel(data: z.infer<typeof wishlistSchema>) {
    await Wishlist.findOneAndUpdate(
      { userId: data.userId },
      { $pull: { hotels: data.hotelId } }
    );
    return;
  }

  async getWishlist(userId: string) {
    const wishlistInDb = await Wishlist.findOne({ userId }).populate("hotels");
    return wishlistInDb === null ? [] : wishlistInDb.hotels;
  }

  async checkHotelInDb(hotelId: string): Promise<boolean> {
    const wishlistInDb = await Wishlist.findOne({ hotels: hotelId });
    return wishlistInDb !== null;
  }
}

export default new WishlistService();
