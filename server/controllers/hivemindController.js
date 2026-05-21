import HiveMindSession from "../models/HiveMindSession.js";
import User from "../models/User.js";

export const getMentors = async (req, res) => {
  try {
    const mentors = await User.find({ isMentor: true }).select("alias rank mentorExpertise nextMentorSlot");
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSession = async (req, res) => {
  try {
    if (!req.user.isMentor) return res.status(403).json({ message: "Only mentors can create slots" });
    const session = new HiveMindSession({
      ...req.body,
      mentor: req.user._id
    });
    const createdSession = await session.save();
    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
