import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { awardPoints } from "../utils/awardPoints.js";
import { sendWelcomeEmail } from "../utils/sendEmail.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password, state, currentStatus, bio, c4iMemberId } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    let isC4IVerified = false;
    if (c4iMemberId && /^C4I-2026-[A-Z0-9]{6}$/.test(c4iMemberId)) {
      isC4IVerified = true;
    }

    const alias = req.body.alias || `Roach#${Math.floor(1000 + Math.random() * 9000)}`;

    const user = await User.create({
      name,
      alias,
      email,
      password: hashedPassword,
      state,
      currentStatus,
      bio,
      c4iMemberId: isC4IVerified ? c4iMemberId : null,
      isC4IVerified
    });

    if (user) {
      if (isC4IVerified) {
        await awardPoints(user._id, "c4i_member_bonus");
      }
      sendWelcomeEmail(user.email, user.alias);
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        alias: user.alias,
        email: user.email,
        isC4IVerified: user.isC4IVerified,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        alias: user.alias,
        email: user.email,
        isC4IVerified: user.isC4IVerified,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleShellShield = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.shellShieldActive = !user.shellShieldActive;
    await user.save();
    res.json({ shellShieldActive: user.shellShieldActive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
