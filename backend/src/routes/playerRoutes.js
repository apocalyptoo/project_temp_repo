import express from 'express';
import { listPlayers } from '../controllers/playerController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, listPlayers);

export default router;
