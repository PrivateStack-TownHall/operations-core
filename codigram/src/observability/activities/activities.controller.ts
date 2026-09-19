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
        id: 'post-4',
        type: 'POST_CREATED',
        entity: 'Post',
        title: 'Sunset at the beach',
        description: 'New post created',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'Codigram',
      },
      {
        id: 'postComment-9',
        type: 'COMMENT_ADDED',
        entity: 'Comment',
        title: 'Amazing photo!',
        description: 'New comment added',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'Codigram',
      },
    ],
  })
  getActivities() {
    return this.activitiesService.getActivities();
  }
}
