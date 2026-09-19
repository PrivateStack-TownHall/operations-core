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
      latestPosts,
      latestCategories,
      latestComments,
    ] = await Promise.all([
      this.prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.postCategory.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.postComment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const activities: ActivityResponseDto[] = [
      ...latestPosts.map((item) => ({
        id: `post-${item.id}`,
        type: 'POST_CREATED',
        entity: 'Post',
        title: String(item.caption ?? 'Untitled post'),
        description: 'New post created',
        createdAt: item.createdAt,
        application: 'Codigram',
      })),

      ...latestCategories.map((item) => ({
        id: `postCategory-${item.id}`,
        type: 'CATEGORY_CREATED',
        entity: 'Category',
        title: String(item.name),
        description: 'New category created',
        createdAt: item.createdAt,
        application: 'Codigram',
      })),

      ...latestComments.map((item) => ({
        id: `postComment-${item.id}`,
        type: 'COMMENT_ADDED',
        entity: 'Comment',
        title: String(item.message),
        description: 'New comment added',
        createdAt: item.createdAt,
        application: 'Codigram',
      })),
    ];

    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }
}
