import Project from "../models/Project.js";
import { awardPoints } from "../utils/awardPoints.js";
import { broadcastFeedEvent } from "../socket/pheromoneSocket.js";
import FeedEvent from "../models/FeedEvent.js";

export const getProjects = async (req, res) => {
  const { category, mode, state, demand, movement, userFilter } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (mode) filter.mode = mode;
  if (state) filter.state = state;
  if (demand) filter.movementDemand = demand;
  if (movement === "true") filter.isMovementBuild = true;
  
  if (userFilter) {
    filter.owner = userFilter;
  } else {
    filter.approvalStatus = "Approved";
  }

  try {
    const projects = await Project.find(filter)
      .populate("owner", "alias rank isC4IVerified")
      .populate("members", "alias")
      .sort("-createdAt");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      owner: req.user._id,
      members: [req.user._id],
      isMovementBuild: !!req.body.movementDemand,
      approvalStatus: "Pending"
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingProjects = async (req, res) => {
  try {
    const projects = await Project.find({ approvalStatus: "Pending" })
      .populate("owner", "alias rank isC4IVerified")
      .sort("createdAt");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("owner");
    if (!project) return res.status(404).json({ message: "Anthill not found" });

    project.approvalStatus = "Approved";
    await project.save();

    await awardPoints(project.owner._id, "project_created", project._id);

    if (project.isMovementBuild) {
      await awardPoints(project.owner._id, "movement_build_bonus", project._id);
    }

    const eventMessage = project.isMovementBuild 
      ? `Movement Build posted: ${project.title}` 
      : `New Anthill opened: ${project.title}`;

    await FeedEvent.create({
      type: project.isMovementBuild ? "movement_build_posted" : "project_posted",
      actor: project.owner._id,
      actorAlias: project.owner.alias,
      message: eventMessage,
      relatedProject: project._id,
      state: project.owner.state
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Anthill not found" });

    project.approvalStatus = "Rejected";
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "alias rank isC4IVerified")
      .populate("members", "alias rank");
    
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "Anthill not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Anthill not found" });

    if (!project.joinRequests.includes(req.user._id) && !project.members.includes(req.user._id)) {
      project.joinRequests.push(req.user._id);
      await project.save();
      res.json({ message: "Join request sent to the colony." });
    } else {
      res.status(400).json({ message: "Already requested or joined" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
