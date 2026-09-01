import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/users.seed';
import { seedHrStructure } from './seeds/hr-structure.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('👨‍💼 Start Seeding M-ployee...');

  await seedUsers(prisma);
  await seedHrStructure(prisma);

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
