import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

export type HealthPayload = {
  status: 'ok' | 'degraded';
  database: 'connected' | 'disconnected' | 'not_configured';
  timestamp: string;
};

@Injectable()
export class HealthService {
  constructor(private readonly config: ConfigService) {}

  async check(): Promise<HealthPayload> {
    const databaseUrl = this.config.get<string>('DATABASE_URL');
    const timestamp = new Date().toISOString();

    if (!databaseUrl) {
      return {
        status: 'degraded',
        database: 'not_configured',
        timestamp,
      };
    }

    const client = new Client({ connectionString: databaseUrl });
    try {
      await client.connect();
      await client.query('SELECT 1');
      return { status: 'ok', database: 'connected', timestamp };
    } catch {
      return { status: 'degraded', database: 'disconnected', timestamp };
    } finally {
      await client.end().catch(() => undefined);
    }
  }
}
