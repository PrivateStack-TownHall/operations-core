import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: any) {
  const password = await bcrypt.hash('123', 10);

  await prisma.user.createMany({
    data: [
      { fullName: 'Admin M-ployee', email: 'admin@mployee.com', password, role: 'ADMIN' },
      { fullName: 'Andi Wijaya', email: 'andi@example.com', password, role: 'MEMBER' },
      { fullName: 'Citra Dewi', email: 'citra@example.com', password, role: 'MEMBER' },
    ],
    skipDuplicates: true,
  });
}
