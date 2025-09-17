import { Request, Response } from "express";
import { apiResponse } from "../utils/ApiResponse.js";
import { registerSchema } from "../schemas/register.schema.js";
import userService from "../services/user.service.js";
import { ZodError } from "zod";
import { loginSchema } from "../schemas/login.schema.js";
import tokenService from "../services/token.service.js";

class AuthController {
  async signup(req: Request, res: Response) {
    let validatedData;
    try {
      validatedData = registerSchema.parse(req.body);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        return apiResponse(res, 400, messages, false);
      }
      console.error(error);
      return apiResponse(res, 400, "Invalid fields!", false);
    }

    if (
      (await userService.checkExistance(validatedData.username, false)).exists
    ) {
      return apiResponse(res, 400, "Username already exists!", false);
    }

    try {
      const userId = await userService.createUser(validatedData);
      return apiResponse(res, 201, "Registered successfully!", true, {
        userId,
      });
    } catch (error) {
      return apiResponse(res, 500, "Failed to register user!", false);
    }
  }

  async login(req: Request, res: Response) {
    let validatedData;
    try {
      validatedData = loginSchema.parse(req.body);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        return apiResponse(res, 400, messages, false);
      }
      console.error(error);
      return apiResponse(res, 401, "Invalid credentials!", false);
    }

    const userInDb = await userService.checkExistance(
      validatedData.username,
      true
    );
    if (!userInDb.exists || userInDb.user === null) {
      return apiResponse(res, 404, "User does not exists!", false);
    }

    if (!(await userInDb.user.checkPassword(validatedData.password))) {
      return apiResponse(res, 401, "Wrong password!", false);
    }

    try {
      const { accessToken, refreshToken } =
        await tokenService.generateAndStoreTokens({
          id: userInDb.user._id,
          username: userInDb.user.username,
        });
      userService.setCookies(res, accessToken, refreshToken);
    } catch (error) {
      return apiResponse(res, 500, "Failed to login, try again later!", false);
    }

    return apiResponse(res, 200, "Logged in successfully!", true);
  }
}

export default new AuthController();
