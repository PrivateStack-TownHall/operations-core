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
      latestEmployees,
      latestDepartments,
      latestJobs,
    ] = await Promise.all([
      this.prisma.employeeProfile.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.department.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),

      this.prisma.job.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const activities: ActivityResponseDto[] = [
      ...latestEmployees.map((item) => ({
        id: `employeeProfile-${item.id}`,
        type: 'EMPLOYEE_ADDED',
        entity: 'Employee',
        title: String(item.id),
        description: 'New employee profile created',
        createdAt: item.createdAt,
        application: 'M-ployee',
      })),

      ...latestDepartments.map((item) => ({
        id: `department-${item.id}`,
        type: 'DEPARTMENT_CREATED',
        entity: 'Department',
        title: String(item.name),
        description: 'New department created',
        createdAt: item.createdAt,
        application: 'M-ployee',
      })),

      ...latestJobs.map((item) => ({
        id: `job-${item.id}`,
        type: 'JOB_CREATED',
        entity: 'Job',
        title: String(item.title),
        description: 'New job created',
        createdAt: item.createdAt,
        application: 'M-ployee',
      })),
    ];

    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }
}
