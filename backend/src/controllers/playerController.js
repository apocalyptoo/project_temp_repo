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


