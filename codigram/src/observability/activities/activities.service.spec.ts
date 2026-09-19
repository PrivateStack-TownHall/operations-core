import { Test, TestingModule } from '@nestjs/testing';

import { ActivitiesService } from './activities.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ActivitiesService', () => {
  let service: ActivitiesService;
  let prisma: { post: { findMany: jest.Mock }; postCategory: { findMany: jest.Mock }; postComment: { findMany: jest.Mock } };

  beforeEach(async () => {
    prisma = { post: { findMany: jest.fn().mockResolvedValue([]) }, postCategory: { findMany: jest.fn().mockResolvedValue([]) }, postComment: { findMany: jest.fn().mockResolvedValue([]) } };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitiesService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('reads only this application models', async () => {
    await service.getActivities();

    expect(prisma.post.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 5, orderBy: { createdAt: 'desc' } }),
    );
  });

  it('returns the newest entries first, capped at ten', async () => {
    const many = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `item ${i}`,
      title: `item ${i}`,
      caption: `item ${i}`,
      body: `item ${i}`,
      message: `item ${i}`,
      invoice: `INV-${i}`,
      code: `TRF-${i}`,
      rating: 5,
      createdAt: new Date(2026, 0, i + 1),
    }));
    prisma.post.findMany.mockResolvedValue(many);

    const result = await service.getActivities();

    expect(result).toHaveLength(10);
    expect(result[0].createdAt.getTime()).toBeGreaterThan(result[1].createdAt.getTime());
    expect(result[0].application).toBe('Codigram');
  });
});
