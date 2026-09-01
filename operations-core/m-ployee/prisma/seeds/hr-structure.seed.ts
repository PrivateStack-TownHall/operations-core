export async function seedHrStructure(prisma: any) {
  const region = await prisma.region.create({ data: { name: 'Southeast Asia' } });
  const country = await prisma.country.create({ data: { regionId: region.id, name: 'Indonesia' } });
  const location = await prisma.location.create({
    data: {
      countryId: country.id,
      city: 'Jakarta',
      streetAddress: 'Jl. Sudirman No. 1',
      postalCode: '10220',
      stateProvince: 'DKI Jakarta',
    },
  });
  const department = await prisma.department.create({ data: { locationId: location.id, name: 'Engineering' } });
  const job = await prisma.job.create({
    data: { title: 'Software Engineer', minSalary: 8000000, maxSalary: 20000000 },
  });

  const members = await prisma.user.findMany({ where: { role: 'MEMBER' } });
  for (const member of members) {
    await prisma.employeeProfile.create({
      data: {
        userId: member.id,
        departmentId: department.id,
        jobId: job.id,
        phoneNumber: '081234567890',
        hireDate: new Date('2024-01-15'),
        salary: 10000000,
      },
    });
  }
}
