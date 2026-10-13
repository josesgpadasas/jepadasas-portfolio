import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service.js';
import type { PortfolioProfile } from './portfolio.types.js';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolio: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: 'Public portfolio profile (read-only)' })
  @ApiOkResponse({ description: 'Portfolio profile document' })
  getProfile(): PortfolioProfile {
    return this.portfolio.getProfile();
  }
}
