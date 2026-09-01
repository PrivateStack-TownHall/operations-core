import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: any) {
  const password = await bcrypt.hash('123', 10);

  await prisma.user.createMany({
    data: [
      { fullName: 'Admin Pineapple', email: 'admin@pineapplestack.com', password, role: 'ADMIN' },
      { fullName: 'Budi Santoso', email: 'budi@example.com', password, role: 'MEMBER' },
      { fullName: 'Siti Aminah', email: 'siti@example.com', password, role: 'MEMBER' },
      { fullName: 'Rudi Hartono', email: 'rudi@example.com', password, role: 'MEMBER' },
    ],
    skipDuplicates: true,
  });
}
