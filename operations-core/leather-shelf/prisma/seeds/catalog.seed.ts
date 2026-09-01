export async function seedCatalog(prisma: any) {
  const author = await prisma.author.create({
    data: { name: 'J.K. Rowling', bio: 'British author, best known for Harry Potter' },
  });
  const publisher = await prisma.publisher.create({
    data: { name: 'Bloomsbury', website: 'https://bloomsbury.com' },
  });
  const genre = await prisma.genre.create({ data: { name: 'Fantasy' } });

  const book = await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      isbn: '9780747532699',
      publisherId: publisher.id,
      publishedYear: 1997,
      description: 'A young wizard discovers his magical heritage on his 11th birthday.',
      totalCopies: 3,
      authors: { create: [{ authorId: author.id }] },
      genres: { create: [{ genreId: genre.id }] },
    },
  });

  const members = await prisma.user.findMany({ where: { role: 'MEMBER' } });
  if (members.length > 0) {
    await prisma.review.create({
      data: { userId: members[0].id, bookId: book.id, rating: 5, comment: 'A magical read!' },
    });
  }
}
