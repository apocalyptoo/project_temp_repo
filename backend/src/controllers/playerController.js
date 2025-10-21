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


//  get player stats
export const getPlayerStats = async (req, res) => {
  try {
    const { id } = req.params;
    const totalTeams = await prisma.teamMember.count({ where: { userId: Number(id) } });
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    res.json({
      totalTeams,
      joinedAt: user?.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch player stats', details: err.message });
  }
};



