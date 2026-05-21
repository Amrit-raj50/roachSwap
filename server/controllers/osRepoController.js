import OpenSourceRepo from "../models/OpenSourceRepo.js";
import { awardPoints } from "../utils/awardPoints.js";
import FeedEvent from "../models/FeedEvent.js";

export const getRepos = async (req, res) => {
  const { userFilter } = req.query;
  const filter = { status: "Active" };
  
  if (userFilter) {
    filter.postedBy = userFilter;
  } else {
    filter.approvalStatus = "Approved";
  }

  try {
    const repos = await OpenSourceRepo.find(filter)
      .populate("postedBy", "alias rank isC4IVerified")
      .sort("-createdAt");
    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;
    
    // Basic validation to ensure it's a github URL
    if (!repoUrl.includes("github.com")) {
      return res.status(400).json({ message: "Must be a valid GitHub repository URL." });
    }

    const repo = new OpenSourceRepo({
      ...req.body,
      postedBy: req.user._id,
      approvalStatus: "Pending"
    });

    const createdRepo = await repo.save();
    res.status(201).json(createdRepo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingRepos = async (req, res) => {
  try {
    const repos = await OpenSourceRepo.find({ approvalStatus: "Pending" })
      .populate("postedBy", "alias rank isC4IVerified")
      .sort("createdAt");
    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveRepo = async (req, res) => {
  try {
    const repo = await OpenSourceRepo.findById(req.params.id).populate("postedBy");
    if (!repo) return res.status(404).json({ message: "Repo not found" });

    repo.approvalStatus = "Approved";
    await repo.save();

    await awardPoints(repo.postedBy._id, "scrap_yard_post", repo._id, 50);

    await FeedEvent.create({
      type: "project_posted", 
      actor: repo.postedBy._id,
      actorAlias: repo.postedBy.alias,
      message: `Tossed a new repo into The Scrap Yard: ${repo.repoName}`,
      state: repo.postedBy.state
    });

    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectRepo = async (req, res) => {
  try {
    const repo = await OpenSourceRepo.findById(req.params.id);
    if (!repo) return res.status(404).json({ message: "Repo not found" });

    repo.approvalStatus = "Rejected";
    await repo.save();
    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
