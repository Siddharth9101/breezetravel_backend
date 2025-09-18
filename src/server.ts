import express from "express";
import dotenv from "dotenv";
dotenv.config();
import CookieParser from "cookie-parser";
import cors from "cors";
import healthRoute from "./routes/health.route.js";
import hotelsRoutes from "./routes/hotel.route.js";
import categoriesRoutes from "./routes/category.route.js";
import mongoose from "mongoose";
import { connectDB } from "./configs/dbconfig.js";
import authRoutes from "./routes/auth.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import job from "./configs/cron.js";
import { apiResponse } from "./utils/ApiResponse.js";

const app = express();
const PORT = 8000;
connectDB();
const whitelist = ["http:localhost:5173"];
if (process.env.NODE_ENV === "production") job.start();

app.use(express.json());
app.use(CookieParser());
app.use(cors({ origin: whitelist, credentials: true }));
app.use("/api", healthRoute);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use((req, res, next) => {
  return apiResponse(res, 404, "Route not found!", false);
});

mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
  app.listen(process.env.PORT || PORT, () =>
    console.log("Server is up and running!")
  );
});
