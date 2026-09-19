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
        id: 'book-15',
        type: 'BOOK_ADDED',
        entity: 'Book',
        title: 'Harry Potter and the Philosopher\'s Stone',
        description: 'New book added',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'Leather Shelf',
      },
      {
        id: 'review-30',
        type: 'REVIEW_CREATED',
        entity: 'Review',
        title: '5 stars',
        description: 'New review added',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'Leather Shelf',
      },
    ],
  })
  getActivities() {
    return this.activitiesService.getActivities();
  }
}
