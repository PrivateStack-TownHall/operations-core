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
        id: 'thread-4',
        type: 'THREAD_CREATED',
        entity: 'Thread',
        title: 'How to deploy NestJS to Render?',
        description: 'New thread created',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'Pineapple Stack',
      },
      {
        id: 'threadComment-9',
        type: 'COMMENT_ADDED',
        entity: 'Comment',
        title: 'Great thread, thanks!',
        description: 'New comment added',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'Pineapple Stack',
      },
    ],
  })
  getActivities() {
    return this.activitiesService.getActivities();
  }
}
