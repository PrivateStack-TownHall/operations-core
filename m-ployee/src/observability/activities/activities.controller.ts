import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActivitiesService } from './activities.service';

import {
  SwaggerInternalServerError,
  SwaggerSuccess,
} from '../../common/swagger/swagger-response';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @SwaggerInternalServerError()
  @ApiOperation({
    summary: 'Get latest activities',
  })
  @SwaggerSuccess({
    success: true,
    data: [
      {
        id: 'employeeProfile-3',
        type: 'EMPLOYEE_ADDED',
        entity: 'Employee',
        title: 'emp-3',
        description: 'New employee profile created',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'M-ployee',
      },
      {
        id: 'department-6',
        type: 'DEPARTMENT_CREATED',
        entity: 'Department',
        title: 'Engineering',
        description: 'New department created',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'M-ployee',
      },
    ],
  })
  getActivities() {
    return this.activitiesService.getActivities();
  }
}
