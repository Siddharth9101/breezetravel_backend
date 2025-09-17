import jwt from "jsonwebtoken";
import { Types } from "mongoose";

class TokenService {
  generateTokens(paylaod: { id: Types.ObjectId; username: string }) {
    const accessToken = jwt.sign(paylaod, process.env.ACCESS_TOKEN_SECRET!);
    const refreshToken = jwt.sign(paylaod, process.env.REFRESH_TOKEN_SECRET!);
    return { accessToken, refreshToken };
  }
}

export default new TokenService();
