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
      latestThreads,
      latestComments,
    ] = await Promise.all([
      this.prisma.thread.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.threadComment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const activities: ActivityResponseDto[] = [
      ...latestThreads.map((item) => ({
        id: `thread-${item.id}`,
        type: 'THREAD_CREATED',
        entity: 'Thread',
        title: String(item.title),
        description: 'New thread created',
        createdAt: item.createdAt,
        application: 'Pineapple Stack',
      })),

      ...latestComments.map((item) => ({
        id: `threadComment-${item.id}`,
        type: 'COMMENT_ADDED',
        entity: 'Comment',
        title: String(item.body),
        description: 'New comment added',
        createdAt: item.createdAt,
        application: 'Pineapple Stack',
      })),
    ];

    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }
}
