import express from "express";
import healthRoute from "./routes/health.route.js";
import hotelsRouter from "./routes/hotel.route.js";
import routeToAddHotelsInDb from "./routes/hotelImport.route.js";
import mongoose from "mongoose";
import { connectDB } from "./configs/dbconfig.js";

const app = express();
const PORT = 8000;
connectDB();

app.use(express.json());
app.use("/api", healthRoute);
app.use("/api/add-hotels", routeToAddHotelsInDb);
app.use("/api/hotels", hotelsRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
  app.listen(process.env.PORT || PORT, () =>
    console.log("Server is up and running!")
  );
});
