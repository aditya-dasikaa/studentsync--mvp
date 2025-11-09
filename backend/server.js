import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic health route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Task routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI) // modern driver: do not pass deprecated options
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message || err);
  });