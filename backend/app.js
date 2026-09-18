import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jobRoutes from "./routes/jobroutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());


mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb://localhost:27017/jobportal"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });


app.use("/api/jobs", jobRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});