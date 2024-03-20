import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { Prisma, PrismaClient } from '@prisma/client';
import { firstValueFrom, from, throwError, timeout } from 'rxjs';

import { Config } from './config/config';

/**
 * your custom app setup, what should be reused in e2e tests
 * (validation pipes, global interceptors, etc.) goes here.
 */
export const setup = async (app: NestApplication) => {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
};

export const startupDbCheck = async (
  config: Config,
  prismaClient = new PrismaClient(),
) => {
  try {
    const isInRecovery = await firstValueFrom(
      from(
        prismaClient.$queryRaw<[{ pg_is_in_recovery: boolean }]>(
          Prisma.raw('SELECT pg_is_in_recovery();'),
        ),
      ).pipe(
        timeout({
          first: config.db.healthCheckTimeout,
          with: () => throwError(() => new Error('Connection timed out')),
        }),
      ),
    );

    if (isInRecovery[0].pg_is_in_recovery) {
      throw new Error('DB is in recovery mode!');
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error((error as any).message);
  } finally {
    await prismaClient.$disconnect();
  }
};
