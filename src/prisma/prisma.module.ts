import { INestApplicationContext, Module } from '@nestjs/common';

import { PrismaHealthIndicator } from './prisma.health-indicator';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, PrismaHealthIndicator],
  exports: [PrismaService, PrismaHealthIndicator],
})
export class PrismaModule {
  /**
   * @deprecated This method is no longer needed with Prisma 5,
   * use regular `app.enableShutdownHooks()` instead.
   *
   * Reference: https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-5#removal-of-the-beforeexit-hook-from-the-library-engine
   *
   * @param app the application instance
   */
  static enableShutdownHooks(app: INestApplicationContext) {
    app.enableShutdownHooks();
  }
}
