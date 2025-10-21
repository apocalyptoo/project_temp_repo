// scripts/createAdmin.js
import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'ahmedjarif468@gmail.com';
  const plain = '1234admin'; // CHANGE this to a strong password
  const name = 'Admin';
  const role = 'ADMIN';

  // Check if admin already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`User with email ${email} already exists (id=${existing.id}).`);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(plain, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role,
      verified: true
    }
  });

  console.log('Created admin user:', { id: user.id, email: user.email });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
