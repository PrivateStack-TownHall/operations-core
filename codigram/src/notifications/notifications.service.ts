import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { appScope } from '../common/scope/app-scope';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMine(userId: string) {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId: userId, ...appScope },
      include: {
        actor: { select: { id: true, fullName: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return { data: notifications };
  }

  async markRead(id: string, userId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: { id, recipientId: userId, ...appScope },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    const updated = await this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
    return { message: 'Notification marked as read', data: updated };
  }

  async markAllRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { recipientId: userId, isRead: false, ...appScope },
      data: { isRead: true },
    });
    return { message: 'All notifications marked as read' };
  }
}
