import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import userService from "./user.service.js";

class TokenService {
  async generateAndStoreTokens(paylaod: {
    id: Types.ObjectId;
    username: string;
  }) {
    const accessToken = jwt.sign(paylaod, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(paylaod, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "1w",
    });

    await userService.storeRefreshTokenInDb(paylaod.id, refreshToken);

    return { accessToken, refreshToken };
  }
}

export default new TokenService();
