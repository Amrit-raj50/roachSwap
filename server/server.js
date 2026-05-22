import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";

import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import hivemindRoutes from "./routes/hivemindRoutes.js";
import frassRoutes from "./routes/frassRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import movementRoutes from "./routes/movementRoutes.js";
import osRepoRoutes from "./routes/osRepoRoutes.js";
import rantRoutes from "./routes/rantRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  }
});

app.use(cors({ 
  origin: true, 
  credentials: true 
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/hivemind", hivemindRoutes);
app.use("/api/frass", frassRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movement", movementRoutes);
app.use("/api/opensource", osRepoRoutes);
app.use("/api/rants", rantRoutes);

app.use(errorHandler);

import { initPheromoneSocket } from "./socket/pheromoneSocket.js";
initPheromoneSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🪳 Colony is live on port ${PORT}. Main Bhi Cockroach.`));
