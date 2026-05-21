import SkillSwap from "../models/SkillSwap.js";
import { awardPoints } from "../utils/awardPoints.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await SkillSwap.find({ status: "Open" }).populate("offeredBy", "alias rank");
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSkillSwap = async (req, res) => {
  try {
    const skill = new SkillSwap({
      ...req.body,
      offeredBy: req.user._id
    });
    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
