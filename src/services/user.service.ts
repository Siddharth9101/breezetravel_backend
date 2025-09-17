import z from "zod";
import User from "../models/user.model.js";
import { registerSchema } from "../schemas/register.schema.js";
import { CheckExistanceReturn } from "../types/index.js";
import { Types } from "mongoose";

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

  async storeRefreshTokenInDb(id: Types.ObjectId, refreshToken: string) {
    await User.findByIdAndUpdate(id, {
      $set: { refreshToken },
    });
    return;
  }
}

export default new UserService();
