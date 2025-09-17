import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import userService from "./user.service.js";
import { JWTPayload } from "../types/index.js";

class TokenService {
  async generateAndStoreTokens(paylaod: JWTPayload) {
    const accessToken = jwt.sign(paylaod, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(paylaod, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "1w",
    });

    await userService.storeRefreshTokenInDb(paylaod.id, refreshToken);

    return { accessToken, refreshToken };
  }

  verifyAndDecodeToken(token: string): JWTPayload {
    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return userData as JWTPayload;
  }
}

export default new TokenService();
