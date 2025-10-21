import express from 'express';
import { listPlayers, getPendingInvites } from '../controllers/playerController.js';
import { verifyToken } from '../middleware/auth.js';
import { getPlayerStats } from '../controllers/playerController.js';
const router = express.Router();

router.get('/', verifyToken, listPlayers);

// get pending invites for current user
router.get('/invites', verifyToken, getPendingInvites);
router.get('/:id', verifyToken, getPlayerStats);

export default router;