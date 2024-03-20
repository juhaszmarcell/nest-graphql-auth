import {
  CreateExpressApplication,
  createExpressApplication,
} from './express/create-express-application';

export class BaseNestFactory {
  /**
   * Creates an instance of NestApplication with the `ExpressAdapter`.
   *
   * @param appModule Entry (root) application module class
   * @param options List of options to initialize NestApplication
   *
   * @returns A promise that, when resolved,
   * contains a reference to the NestApplication instance.
   */
  static createExpressApplication: CreateExpressApplication =
    createExpressApplication;
}
