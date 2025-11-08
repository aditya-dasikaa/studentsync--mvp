import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js"; // ✅ import routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Base test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Task routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
