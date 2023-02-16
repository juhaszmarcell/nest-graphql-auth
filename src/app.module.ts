import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: false,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      cors: {
        credentials: true,
        origin: true,
      },
      typePaths: ['./src/**/*.graphql'],
      definitions: {
        emitTypenameField: true,
        path: join(process.cwd(), 'src/graphql/graphqlTypes.ts'),
        outputAs: 'interface',
      },
    }),
    ConfigModule,
    PrismaModule,
    HealthModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
