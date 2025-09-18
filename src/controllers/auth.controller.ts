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

  async logout(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return apiResponse(res, 400, "Login first!", false);
    }
    try {
      await tokenService.removeTokenFromDb(userId);
      userService.removeCookies(res);
      return apiResponse(res, 200, "Logged out!", true);
    } catch (error) {
      console.error(error);
      return apiResponse(res, 500, "Failed to logout!", false);
    }
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    if (!refreshTokenFromCookie) {
      return apiResponse(res, 401, "Invalid Token!", false);
    }

    let userData;
    try {
      userData = tokenService.verifyAndDecodeToken(refreshTokenFromCookie);
      if (!userData) {
        throw new Error();
      }
    } catch (error) {
      return apiResponse(res, 401, "Invalid Token!", false);
    }

    try {
      const tokenExistsInDb = await tokenService.findUserWithRefreshToken(
        userData.id,
        refreshTokenFromCookie
      );

      if (!tokenExistsInDb) {
        return apiResponse(res, 404, "User not found!", false);
      }

      const { accessToken, refreshToken } =
        await tokenService.generateAndStoreTokens(userData);

      userService.setCookies(res, accessToken, refreshToken);
      return apiResponse(res, 200, "Token refreshed!", true);
    } catch (error) {
      console.error(error);
      return apiResponse(res, 500, "Failed to refresh token!", false);
    }
  }
}

export default new AuthController();
