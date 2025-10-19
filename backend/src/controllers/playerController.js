import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const listPlayers = async (req, res) => {
  try {
    const players = await prisma.user.findMany({
      where: { role: 'PLAYER' },
      select: { id: true, name: true, email: true, createdAt: true }
    });
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch players', details: err.message });
  }
};

// NEW: get pending invites for current user
export const getPendingInvites = async (req, res) => {
  try {
    const userId = req.user.id;
    const invites = await prisma.teamMember.findMany({
      where: { userId, status: "pending" },
      include: {
        team: {
          include: {
            owner: { select: { id: true, name: true } }
          }
        }
      },
      orderBy: { joinedAt: 'desc' }
    });
    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invites', details: err.message });
  }
};


