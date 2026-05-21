import Project from "../models/Project.js";
import User from "../models/User.js";

export const getMovementStats = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments({ isMovementBuild: true });
    const userCount = await User.countDocuments({ isC4IVerified: true });
    res.json({ totalMovementProjects: projectCount, verifiedRoaches: userCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
