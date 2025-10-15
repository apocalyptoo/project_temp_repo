import express from 'express';
import { createTeam, joinTeam, getTeams, invitePlayer, acceptInvite } from '../controllers/teamController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

// Protected routes
router.post("/create", verifyToken, createTeam);
router.post("/:teamId/join", verifyToken, joinTeam);
router.post("/:teamId/invite", verifyToken, invitePlayer);
router.post("/:teamId/accept", verifyToken, acceptInvite);
router.get("/", verifyToken, getTeams);

export default router;
