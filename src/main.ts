import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Config } from './config/config';
import { BaseNestFactory } from './nest-factory/nest.factory';
import { PrismaModule } from './prisma/prisma.module';
import { setup, startupDbCheck } from './setup';

async function bootstrap() {
  const app = await BaseNestFactory.createExpressApplication(AppModule, {
    customShutdownHooksEnabler: PrismaModule.enableShutdownHooks,
  });

  const config = app.get(Config);

  await startupDbCheck(config);

  // App setup
  await setup(app);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    preflightContinue: true,
    credentials: true,
  });
  // Swagger setup
  const documentBuilder = new DocumentBuilder()
    .setTitle(config.applicationName)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);

  const { port, host } = config.server;
  await app.listen(port, host);
}
bootstrap();
