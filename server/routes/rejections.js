import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Rejection from "../models/Rejection.js";
import { protect } from "../middleware/authMiddleware.js";
import { awardPoints } from "../utils/awardPoints.js";

const router = express.Router();

// Multer storage setup for saving files locally under server/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

// Restrict to images (PNG, JPEG, JPG) and PDFs
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PNG, JPEG, JPG, and PDF are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Satirical Corporate Buzzwords & Weights
const BUZZWORDS = [
  { term: "unfortunately", weight: 2.0 },
  { term: "impressed by your background", weight: 2.5 },
  { term: "impressed by your", weight: 2.0 },
  { term: "impressed", weight: 1.5 },
  { term: "future endeavors", weight: 2.5 },
  { term: "kept on file", weight: 2.0 },
  { term: "moving forward", weight: 2.0 },
  { term: "other candidates", weight: 2.0 },
  { term: "highly qualified", weight: 1.5 },
  { term: "carefully reviewed", weight: 1.5 }
];

// POST - Propose / Submit Rejection Post
router.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    const { content, company } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: "Rejection text/content is required." });
    }

    if (content.length > 300) {
      return res.status(400).json({ message: "Misery must be concise. Max 300 characters." });
    }

    let attachmentUrl = "";
    let attachmentType = null;

    if (req.file) {
      // Resolve static host serving path (starts with /uploads)
      attachmentUrl = `/uploads/${req.file.filename}`;
      attachmentType = req.file.mimetype === "application/pdf" ? "pdf" : "image";
    }

    // 1. Calculate Hypocrisy Score (Baseline 2, Max 10)
    let score = 2.0;
    const lowerContent = content.toLowerCase();
    const detectedWords = [];

    BUZZWORDS.forEach(buzz => {
      if (lowerContent.includes(buzz.term)) {
        score += buzz.weight;
        detectedWords.push(buzz.term);
      }
    });

    // Clamp score strictly between 1 and 10
    const hypocrisyScore = Math.min(10, Math.max(1, Math.round(score)));

    // 2. Generate Simulated Bounding Boxes for Front-end Neon OCR Overlays
    const scannerHighlights = [];
    detectedWords.forEach((word, index) => {
      // Mock coordinates mapping responsively in percentages (x: 5% - 75%, y: 10% - 80%)
      scannerHighlights.push({
        text: `HR Cliché: "${word}"`,
        x: Math.round(10 + Math.random() * 55),
        y: Math.round(15 + Math.random() * 50 + (index * 12)), // space vertically
        w: Math.round(20 + Math.random() * 15),
        h: 7
      });
    });

    const rejection = await Rejection.create({
      author: req.user._id,
      content,
      company: company || "Unknown Entity",
      attachmentUrl,
      attachmentType,
      hypocrisyScore,
      scannerHighlights
    });

    // Award 10 points for uploading screenshot proof, or 5 points for standard text post
    const pointGain = req.file ? 10 : 5;
    await awardPoints(req.user._id, "rejection_posted", rejection._id, pointGain);

    const populated = await Rejection.findById(rejection._id).populate("author", "alias rank");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Query Rejections
router.get("/", async (req, res) => {
  try {
    const rejections = await Rejection.find()
      .populate("author", "alias rank")
      .sort("-createdAt")
      .limit(100);
    res.json(rejections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Upvote Rejection Wall Post
router.post("/:id/upvote", protect, async (req, res) => {
  try {
    const rejection = await Rejection.findById(req.params.id);
    if (!rejection) {
      return res.status(404).json({ message: "Rejection post not found." });
    }

    if (rejection.upvotedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "Already upvoted." });
    }

    rejection.upvotes += 1;
    rejection.upvotedBy.push(req.user._id);
    await rejection.save();

    res.json(rejection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
