import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';

export type CreateExpressApplication = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appModule: any,
  options?: Omit<NestApplicationOptions, 'logger'> & {
    /**
     * Use this method in place of `app.enableShutdownHooks()`
     */
    customShutdownHooksEnabler?: (app: NestApplication) => void;
  },
) => Promise<NestApplication>;

export const createExpressApplication: CreateExpressApplication = async (
  appModule,
  options = {},
) => {
  const app = await NestFactory.create<NestApplication>(appModule, {
    ...options,
    logger: new Logger(),
  });

  const { customShutdownHooksEnabler } = options;

  // ensures app shut downs gracefully (executes appropriate hooks)
  if (customShutdownHooksEnabler) {
    customShutdownHooksEnabler(app);
  } else {
    app.enableShutdownHooks();
  }

  return app;
};
