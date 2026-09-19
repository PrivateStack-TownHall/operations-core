import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { appScope } from '../common/scope/app-scope';

@Injectable()
export class ThreadLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async toggle(threadId: string, userId: string) {
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });
    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    const existing = await this.prisma.threadLike.findUnique({
      where: { userId_threadId: { userId, threadId } },
    });

    if (existing) {
      await this.prisma.threadLike.delete({ where: { id: existing.id } });
      return { message: 'Thread unliked', data: { liked: false } };
    }

    await this.prisma.threadLike.create({ data: { threadId, userId } });

    if (thread.userId !== userId) {
      await this.prisma.notification.create({
        data: {
          ...appScope,
          recipientId: thread.userId,
          actorId: userId,
          type: 'THREAD_LIKED',
          entityType: 'Thread',
          entityId: thread.id,
        },
      });
    }

    return { message: 'Thread liked', data: { liked: true } };
  }
}
