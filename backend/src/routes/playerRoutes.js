import express from 'express';
import { listPlayers} from '../controllers/playerController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, listPlayers);

// NEW: get pending invites for current user
//router.get('/invites', verifyToken, getPendingInvites) , getPendingInvites ;

export default router;
