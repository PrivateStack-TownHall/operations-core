import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/users.seed';
import { seedThreads } from './seeds/threads.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🍍 Start Seeding Pineapple Stack...');

  await seedUsers(prisma);
  await seedThreads(prisma);

  console.log('✅ Seeding Completed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
