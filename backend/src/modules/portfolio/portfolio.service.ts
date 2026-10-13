import { Injectable } from '@nestjs/common';
import { getPortfolioProfile } from './portfolio.data.js';
import type { PortfolioProfile } from './portfolio.types.js';

@Injectable()
export class PortfolioService {
  getProfile(): PortfolioProfile {
    return getPortfolioProfile();
  }
}
