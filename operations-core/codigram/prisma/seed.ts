import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/users.seed';
import { seedPostCategories } from './seeds/post-categories.seed';
import { seedPosts } from './seeds/posts.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('📸 Start Seeding Codigram...');

  await seedUsers(prisma);
  await seedPostCategories(prisma);
  await seedPosts(prisma);

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
