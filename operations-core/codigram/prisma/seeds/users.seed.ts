import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: any) {
  const password = await bcrypt.hash('123', 10);

  await prisma.user.createMany({
    data: [
      { fullName: 'Admin Codigram', email: 'admin@codigram.com', password, role: 'ADMIN' },
      { fullName: 'Dina Pratiwi', email: 'dina@example.com', password, role: 'MEMBER' },
      { fullName: 'Fajar Nugroho', email: 'fajar@example.com', password, role: 'MEMBER' },
      { fullName: 'Lestari Wulandari', email: 'lestari@example.com', password, role: 'MEMBER' },
    ],
    skipDuplicates: true,
  });
}
