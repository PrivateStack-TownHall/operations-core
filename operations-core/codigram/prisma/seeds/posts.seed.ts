export async function seedPosts(prisma: any) {
  const users = await prisma.user.findMany({ where: { role: 'MEMBER' } });
  const categories = await prisma.postCategory.findMany();
  if (users.length === 0 || categories.length === 0) return;

  const captions = [
    'Beautiful sunset at the beach today! 🌅',
    'Best ramen I have ever had 🍜',
    'Just got my new laptop, so excited!',
    'Morning coffee hits different ☕',
  ];

  for (const caption of captions) {
    const author = users[Math.floor(Math.random() * users.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];

    await prisma.post.create({
      data: { userId: author.id, categoryId: category.id, caption },
    });
  }
}
