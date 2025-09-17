import { Request, Response } from "express";
import { wishlistSchema } from "../schemas/wishlist.schema.js";
import { ZodError } from "zod";
import { apiResponse } from "../utils/ApiResponse.js";
import wishlistService from "../services/wishlist.service.js";

class WishlistController {
  async addHotel(req: Request, res: Response) {
    const userId = req.user?.id;

    let validatedData;
    try {
      validatedData = wishlistSchema.parse({ ...req.body, userId });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        return apiResponse(res, 400, messages, false);
      }
      console.error(error);
      return apiResponse(res, 400, "Bad Request Body!", false);
    }

    try {
      if (await wishlistService.checkHotelInDb(validatedData.hotelId)) {
        return apiResponse(res, 400, "Hotel already in Wishlist!", false);
      }
    } catch (error) {
      console.error(error);
      return apiResponse(res, 500, "Failed to add hotel to Wishlist!", false);
    }

    try {
      await wishlistService.addHotel(validatedData);
      return apiResponse(res, 201, "Hotel added to Wishlist!", true);
    } catch (error) {
      console.error(error);
      return apiResponse(res, 500, "Failed to add hotel to Wishlist!", false);
    }
  }

  async removeHotel(req: Request, res: Response) {
    const userId = req.user?.id;

    let validatedData;
    try {
      validatedData = wishlistSchema.parse({ ...req.body, userId });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        return apiResponse(res, 400, messages, false);
      }
      console.error(error);
      return apiResponse(res, 400, "Bad Request Body!", false);
    }

    try {
      if (!(await wishlistService.checkHotelInDb(validatedData.hotelId))) {
        return apiResponse(
          res,
          400,
          "Hotel does not exist in Wishlist!",
          false
        );
      }
    } catch (error) {
      console.error(error);
      return apiResponse(
        res,
        500,
        "Failed to remove hotel from Wishlist!",
        false
      );
    }

    try {
      await wishlistService.removeHotel(validatedData);
      return apiResponse(res, 200, "Hotel removed from Wishlist!", true);
    } catch (error) {
      console.error(error);
      return apiResponse(
        res,
        500,
        "Failed to remove hotel from Wishlist!",
        false
      );
    }
  }

  async getWishlist(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
      const wishlist = await wishlistService.getWishlist(userId);
      return apiResponse(
        res,
        200,
        "Wishlist fetched successfully!",
        true,
        wishlist
      );
    } catch (error) {
      console.error(error);
      return apiResponse(res, 500, "Failed to fetch Wishlist!", false);
    }
  }
}

export default new WishlistController();
