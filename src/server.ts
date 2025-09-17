import express from "express";
import dotenv from "dotenv";
dotenv.config();
import CookieParser from "cookie-parser";
import cors from "cors";
import healthRoute from "./routes/health.route.js";
import hotelsRoutes from "./routes/hotel.route.js";
import routeToAddHotelsInDb from "./routes/hotelImport.route.js";
import categoriesRoutes from "./routes/category.route.js";
import routeToAddCategoriesInDb from "./routes/categoryImport.route.js";
import mongoose from "mongoose";
import { connectDB } from "./configs/dbconfig.js";
import authRoutes from "./routes/auth.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";

const app = express();
const PORT = 8000;
connectDB();
const whitelist = ["http:localhost:5173"];

app.use(express.json());
app.use(CookieParser());
app.use(cors({ origin: whitelist, credentials: true }));
app.use("/api", healthRoute);
app.use("/api/add-hotels", routeToAddHotelsInDb);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/add-categories", routeToAddCategoriesInDb);
app.use("/api/auth", authRoutes);
app.use("/api/wishlists", wishlistRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
  app.listen(process.env.PORT || PORT, () =>
    console.log("Server is up and running!")
  );
});
