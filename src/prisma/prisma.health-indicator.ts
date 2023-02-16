import { Inject, Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';
import { firstValueFrom, from, throwError, timeout } from 'rxjs';

import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async isHealthy(key = 'database', ms = 1000) {
    let isHealthy = true;
    let message: string | undefined = undefined;

    try {
      await firstValueFrom(
        from(this.probeDatabase()).pipe(
          timeout({
            first: ms,
            with: () => throwError(() => new Error('Connection timed out')),
          }),
        ),
      );
    } catch (error) {
      isHealthy = false;
      message = (error as Error).message;
    }
    const healthCheckResult = this.getStatus(key, isHealthy, { message });

    if (isHealthy) {
      return healthCheckResult;
    }

    throw new HealthCheckError('Prisma health check failed', healthCheckResult);
  }

  private probeDatabase(): Promise<unknown> {
    return this.prisma.$queryRaw`SELECT 1`;
  }
}
