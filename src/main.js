import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import mainRouter from "./routes.js";
config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", mainRouter);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDatabase();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on PORT: " + PORT);
});
