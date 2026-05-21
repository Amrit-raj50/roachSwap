import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const email = process.argv[2];
    if (!email) {
      console.error("Please provide the email of the user to promote. Usage: node makeAdmin.js <user-email>");
      process.exit(1);
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }

    user.role = "admin";
    await user.save();

    console.log(`Success! ${user.alias} (${email}) is now an Admin.`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating user:", error);
    process.exit(1);
  }
};

makeAdmin();
