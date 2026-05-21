import Rant from "../models/Rant.js";
import { awardPoints } from "../utils/awardPoints.js";

export const getRants = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const rants = await Rant.find(filter)
      .populate("author", "alias rank")
      .sort("-createdAt")
      .limit(100);
    res.json(rants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRandomTickerRants = async (req, res) => {
  try {
    const rants = await Rant.aggregate([
      { $sample: { size: 15 } }
    ]);
    
    await Rant.populate(rants, { path: "author", select: "alias" });
    res.json(rants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRant = async (req, res) => {
  try {
    const { content, company, type } = req.body;
    
    if (content.length > 300) {
      return res.status(400).json({ message: "Keep it short. We are lazy." });
    }

    const rant = await Rant.create({
      author: req.user._id,
      content,
      company,
      type
    });

    // Award 5 points for venting
    await awardPoints(req.user._id, "rant_posted", rant._id, 5);

    res.status(201).json(rant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upvoteRant = async (req, res) => {
  try {
    const rant = await Rant.findById(req.params.id);
    if (!rant) return res.status(404).json({ message: "Not found" });

    if (rant.upvotedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "Already upvoted" });
    }

    rant.upvotes += 1;
    rant.upvotedBy.push(req.user._id);
    await rant.save();

    res.json(rant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
