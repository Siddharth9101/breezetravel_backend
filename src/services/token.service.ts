import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import userService from "./user.service.js";
import { JWTPayload } from "../types/index.js";
import User from "../models/user.model.js";

class TokenService {
  async generateAndStoreTokens(payload: JWTPayload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "1w",
    });

    await User.findByIdAndUpdate(payload.id, {
      $set: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  verifyAndDecodeToken(token: string): JWTPayload {
    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return userData as JWTPayload;
  }

  async removeTokenFromDb(userId: Types.ObjectId) {
    await User.findByIdAndUpdate(userId, { $set: { refreshToken: null } });
    return;
  }

  async findUserWithRefreshToken(
    id: Types.ObjectId,
    token: string
  ): Promise<boolean> {
    const user = await User.findOne({ _id: id, refreshToken: token });
    return user !== null;
  }
}

export default new TokenService();
