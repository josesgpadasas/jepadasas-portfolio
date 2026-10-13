import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module.js';
import { PortfolioModule } from './modules/portfolio/portfolio.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    PortfolioModule,
  ],
})
export class AppModule {}
