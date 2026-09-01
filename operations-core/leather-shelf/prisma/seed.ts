import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/users.seed';
import { seedCatalog } from './seeds/catalog.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('📚 Start Seeding Leather Shelf...');

  await seedUsers(prisma);
  await seedCatalog(prisma);

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
