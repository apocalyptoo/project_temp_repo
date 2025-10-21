import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // 1️⃣ Remove this user from any team memberships
    await prisma.teamMember.deleteMany({ where: { userId: id } });

    // 2️⃣ Delete all teams owned by this user
    const ownedTeams = await prisma.team.findMany({ where: { ownerId: id } });
    for (const team of ownedTeams) {
      // Delete team members first
      await prisma.teamMember.deleteMany({ where: { teamId: team.id } });
      // Then delete the team
      await prisma.team.delete({ where: { id: team.id } });
    }

    // 3️⃣ Delete the user
    await prisma.user.delete({ where: { id } });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};


// ✅ Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: { owner: { select: { name: true, email: true } } }
    });
    res.json(teams);
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Delete team (updated for manual deletion of members)
export const deleteTeam = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // 1️⃣ Delete all team members
    await prisma.teamMember.deleteMany({ where: { teamId: id } });

    // 2️⃣ Delete the team
    await prisma.team.delete({ where: { id } });

    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    console.error('Error deleting team:', err);
    res.status(500).json({ error: 'Failed to delete team', details: err.message });
  }
};

// ✅ System summary
export const getStats = async (req, res) => {
  try {
    const [userCount, teamCount] = await Promise.all([
      prisma.user.count(),
      prisma.team.count(),
    ]);
    res.json({ userCount, teamCount });
  } catch (err) {
    console.error('Error getting stats:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
