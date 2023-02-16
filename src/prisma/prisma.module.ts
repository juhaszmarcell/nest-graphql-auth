import { INestApplicationContext, Module } from '@nestjs/common';

import { PrismaHealthIndicator } from './prisma.health-indicator';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, PrismaHealthIndicator],
  exports: [PrismaService, PrismaHealthIndicator],
})
export class PrismaModule {
  /**
   * Use this static method in place of `app.enableShutdownHooks()`
   *
   * Prisma interferes with NestJS enableShutdownHooks. Prisma listens for shutdown signals and will call process.exit()
   * before the application shutdown hooks fire. To deal with this, we need to add a listener for Prisma beforeExit event.
   *
   * @param app the application instance
   */
  static enableShutdownHooks(app: INestApplicationContext) {
    const prisma = app.select(PrismaModule).get(PrismaService);
    prisma.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
