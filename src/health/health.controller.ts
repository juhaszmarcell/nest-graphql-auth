import { PrismaHealthIndicator } from '../prisma/prisma.health-indicator';

import { CommandRunnerHealthIndicator } from '../nestjs-command-runner/on-bootstrap/command-runner.health-indicator';
import { Controller, Get, Post } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
    private commandRunner: CommandRunnerHealthIndicator,
  ) {}

  @Get('liveness')
  @HealthCheck()
  live() {
    return this.health.check([]);
  }

  @Post('post')
  @HealthCheck()
  readyPost() {
    return this.health.check([]);
  }

  @Get('readiness')
  @HealthCheck()
  ready() {
    return this.health.check([
      async () => this.prisma.isHealthy('db'),
      async () => this.commandRunner.isSucceded('db-migration'),
    ]);
  }
}
