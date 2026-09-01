export async function seedThreads(prisma: any) {
  const users = await prisma.user.findMany({ where: { role: 'MEMBER' } });
  if (users.length === 0) return;

  const threadsData = [
    { title: 'How to deploy NestJS to Render?', category: 'deployment' },
    { title: 'Best practices for Prisma migrations', category: 'database' },
    { title: 'JWT vs Session authentication', category: 'auth' },
    { title: 'Tips for writing clean DTOs', category: 'general' },
  ];

  for (const t of threadsData) {
    const author = users[Math.floor(Math.random() * users.length)];
    const slug = `${t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.random().toString(36).slice(2, 8)}`;

    await prisma.thread.create({
      data: {
        userId: author.id,
        title: t.title,
        slug,
        body: `Discussion about: ${t.title}. Feel free to share your thoughts!`,
        category: t.category,
      },
    });
  }
}
