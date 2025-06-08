import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongodb_uri = process.env.MONGODB_URI;
if (!mongodb_uri) {
  console.log("Mongodb uri is missing");
  process.exit(1);
}
export const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB is already connected");
      return;
    }
    await mongoose.connect(mongodb_uri, {
      dbName: "Employee_Management",
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
