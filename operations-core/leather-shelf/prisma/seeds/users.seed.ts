import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: any) {
  const password = await bcrypt.hash('123', 10);

  await prisma.user.createMany({
    data: [
      { fullName: 'Admin Leather Shelf', email: 'admin@leathershelf.com', password, role: 'ADMIN' },
      { fullName: 'Eka Prasetya', email: 'eka@example.com', password, role: 'MEMBER' },
      { fullName: 'Gita Permata', email: 'gita@example.com', password, role: 'MEMBER' },
    ],
    skipDuplicates: true,
  });
}
