import "express";
import { JWTPayload } from "../index.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: JWTPayload;
  }
}
