import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService, type HealthPayload } from './health.service.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Service and database connectivity check' })
  @ApiOkResponse({ description: 'Health status' })
  getHealth(): Promise<HealthPayload> {
    return this.health.check();
  }
}
