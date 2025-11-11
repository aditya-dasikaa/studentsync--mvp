import mongoose from "mongoose";

async function testConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://adityahdasika_db_user:adityahdasika123@cluster0.w372zz5.mongodb.net/studentsync?retryWrites=true&w=majority"
    );
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  } finally {
    mongoose.disconnect();
  }
}

testConnection();
