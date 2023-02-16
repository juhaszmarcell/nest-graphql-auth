// How do I make TS happy??
import { Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();

    await this.$use(async (params, next) => {
      const { action, model, runInTransaction, dataPath, args } = params;
      this.logger.log({ action, model });
      this.logger.debug({ args, runInTransaction, dataPath });
      const result: unknown = await next(params);
      this.logger.debug({ result });
      return result;
    });
  }
}
