import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: any) {
  const password = await bcrypt.hash('123', 10);

  await prisma.user.createMany({
    data: [
      { fullName: 'Admin WareTrack', email: 'admin@waretrack.com', password, role: 'ADMIN' },
      { fullName: 'Hendra Saputra', email: 'hendra@example.com', password, role: 'MEMBER' },
      { fullName: 'Indah Permatasari', email: 'indah@example.com', password, role: 'MEMBER' },
    ],
    skipDuplicates: true,
  });
}
