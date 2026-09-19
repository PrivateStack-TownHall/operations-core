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
      latestBooks,
      latestAuthors,
      latestReviews,
    ] = await Promise.all([
      this.prisma.book.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.author.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const activities: ActivityResponseDto[] = [
      ...latestBooks.map((item) => ({
        id: `book-${item.id}`,
        type: 'BOOK_ADDED',
        entity: 'Book',
        title: String(item.title),
        description: 'New book added',
        createdAt: item.createdAt,
        application: 'Leather Shelf',
      })),

      ...latestAuthors.map((item) => ({
        id: `author-${item.id}`,
        type: 'AUTHOR_ADDED',
        entity: 'Author',
        title: String(item.name),
        description: 'New author added',
        createdAt: item.createdAt,
        application: 'Leather Shelf',
      })),

      ...latestReviews.map((item) => ({
        id: `review-${item.id}`,
        type: 'REVIEW_CREATED',
        entity: 'Review',
        title: String(`${item.rating} stars`),
        description: 'New review added',
        createdAt: item.createdAt,
        application: 'Leather Shelf',
      })),
    ];

    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }
}
