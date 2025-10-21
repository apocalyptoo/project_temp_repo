import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import { 
  getAllUsers, deleteUser, 
  getAllTeams, deleteTeam, 
  getStats 
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.get('/teams', verifyToken, isAdmin, getAllTeams);
router.delete('/teams/:id', verifyToken, isAdmin, deleteTeam);
router.get('/stats', verifyToken, isAdmin, getStats);

export default router;
