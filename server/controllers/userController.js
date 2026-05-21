import User from "../models/User.js";
import { applyShellShield } from "../middleware/shellShield.js";

export const getUserExoResume = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -email");
    if (!user) return res.status(404).json({ message: "Roach not found" });
    res.json(applyShellShield(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("alias rank colonyPoints shellShieldActive currentStatus isC4IVerified")
      .sort("-colonyPoints")
      .limit(50);
    
    const shieldedUsers = users.map(user => applyShellShield(user));
    res.json(shieldedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
