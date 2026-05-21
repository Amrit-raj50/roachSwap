import FeedEvent from "../models/FeedEvent.js";

export const getFeed = async (req, res) => {
  try {
    const filter = req.query.state ? { state: req.query.state } : {};
    const events = await FeedEvent.find(filter)
      .sort("-createdAt")
      .limit(50)
      .populate("relatedProject", "title");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
