import { get } from 'env-var';

export class Config {
  applicationName = 'nest-graphql-auth';
  server = {
    host: get('SERVER_HOST').default('0.0.0.0').asString(),
    port: get('SERVER_PORT').default('3000').asString(),
  };
  JWTAccessSecretKey = get('JWT_SECRET_KEY').default('mysecret').asString();
}
