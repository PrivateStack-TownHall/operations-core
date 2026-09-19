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
        id: 'product-3',
        type: 'PRODUCT_CREATED',
        entity: 'Product',
        title: 'Wireless Mouse',
        description: 'New product created',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'WareTrack',
      },
      {
        id: 'purchase-3',
        type: 'PURCHASE_CREATED',
        entity: 'Purchase',
        title: 'INV-2026-001',
        description: 'New purchase recorded',
        createdAt: '2026-09-18T01:00:00.000Z',
        application: 'WareTrack',
      },
    ],
  })
  getActivities() {
    return this.activitiesService.getActivities();
  }
}
