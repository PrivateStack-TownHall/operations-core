export async function seedPostCategories(prisma: any) {
  await prisma.postCategory.createMany({
    data: [
      { name: 'Travel', description: 'Posts about travel and adventure' },
      { name: 'Food', description: 'Posts about culinary experiences' },
      { name: 'Technology', description: 'Posts about tech and gadgets' },
      { name: 'Lifestyle', description: 'Posts about daily life' },
    ],
    skipDuplicates: true,
  });
}
