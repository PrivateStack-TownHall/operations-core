export async function seedCatalog(prisma: any) {
  const category = await prisma.productCategory.create({
    data: { code: 'ELEC', name: 'Electronics', description: 'Electronic devices and accessories' },
  });
  const brand = await prisma.brand.create({ data: { name: 'Logitech' } });

  const product = await prisma.product.create({
    data: {
      categoryId: category.id,
      brandId: brand.id,
      sku: 'SKU-001',
      name: 'Wireless Mouse',
      unit: 'pcs',
      costPrice: 50000,
      sellingPrice: 75000,
      minimumQty: 10,
    },
  });

  const warehouse = await prisma.warehouse.create({
    data: { code: 'WH-JKT-01', name: 'Jakarta Main Warehouse', capacity: 5000 },
  });
  const location = await prisma.warehouseLocation.create({
    data: { warehouseId: warehouse.id, code: 'A-01-01', name: 'Rack A, Row 1, Bin 1', capacity: 100 },
  });

  await prisma.stock.create({
    data: { warehouseId: warehouse.id, locationId: location.id, productId: product.id, quantity: 50 },
  });

  await prisma.supplier.create({
    data: { name: 'PT Sumber Elektronik', contactPerson: 'Budi', phone: '021-1234567' },
  });

  await prisma.setting.create({
    data: {
      warehouseName: 'WareTrack HQ',
      warehouseCode: 'WH-HQ',
      warehouseAddress: 'Jl. Industri No. 1',
      warehouseCapacity: 10000,
    },
  });
}
