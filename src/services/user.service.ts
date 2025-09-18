import z from "zod";
import User from "../models/user.model.js";
import { registerSchema } from "../schemas/register.schema.js";
import { CheckExistanceReturn } from "../types/index.js";
import { Types } from "mongoose";
import { CookieOptions, Response } from "express";

class UserService {
  async checkExistance<T extends boolean>(
    username: string | undefined,
    returning: T
  ): Promise<CheckExistanceReturn<T>> {
    const foundUser = await User.findOne({ username });
    if (returning) {
      return {
        exists: foundUser !== null,
        user: foundUser,
      } as CheckExistanceReturn<T>;
    } else {
      return { exists: foundUser !== null } as CheckExistanceReturn<T>;
    }
  }

  async createUser(data: z.infer<typeof registerSchema>) {
    const newUser = await User.create(data);
    return newUser._id;
  }

  setCookies(res: Response, accessToken: string, refreshToken: string) {
    const options: CookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    };
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    return;
  }

  removeCookies(res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return;
  }
}

export default new UserService();
