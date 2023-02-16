import { PrismaModule } from '../prisma/prisma.module';

import { CommandRunnerModule } from '../nestjs-command-runner/command-runner-module';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { ConfigModule } from '../config/config.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule,
    ConfigModule,
    PrismaModule,
    CommandRunnerModule.register({
      runCommandOnApplicationBootstrap: 'npm run db:migrate:prod',
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
