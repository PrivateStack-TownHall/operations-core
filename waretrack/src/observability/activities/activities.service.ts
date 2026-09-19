import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { ActivityResponseDto } from './dto/activity-response.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Recent events of this application. Its models are its own — the shared
   * tables (User, Notification, AuditLog) are not listed here.
   */
  async getActivities(): Promise<ActivityResponseDto[]> {
    const [
      latestProducts,
      latestPurchases,
      latestTransfers,
    ] = await Promise.all([
      this.prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.purchase.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.transfer.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const activities: ActivityResponseDto[] = [
      ...latestProducts.map((item) => ({
        id: `product-${item.id}`,
        type: 'PRODUCT_CREATED',
        entity: 'Product',
        title: String(item.name),
        description: 'New product created',
        createdAt: item.createdAt,
        application: 'WareTrack',
      })),

      ...latestPurchases.map((item) => ({
        id: `purchase-${item.id}`,
        type: 'PURCHASE_CREATED',
        entity: 'Purchase',
        title: String(item.invoice),
        description: 'New purchase recorded',
        createdAt: item.createdAt,
        application: 'WareTrack',
      })),

      ...latestTransfers.map((item) => ({
        id: `transfer-${item.id}`,
        type: 'TRANSFER_CREATED',
        entity: 'Transfer',
        title: String(item.code),
        description: 'New transfer recorded',
        createdAt: item.createdAt,
        application: 'WareTrack',
      })),
    ];

    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }
}
