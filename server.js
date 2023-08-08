import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user-routes.js";
import authRoute from "./routes/auth-route.js";
import tripRoutes from "./routes/trips-routes.js";
import restaurantRoutes from "./routes/restaurant-routes.js";
import hotelRoutes from "./routes/hotel-routes.js";
import attractionRoutes from "./routes/attraction-routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();
mongoose.set("strictQuery", true);

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Load Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/trips", tripRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/attractions", attractionRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log("Backend server is running");
});
