import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      plugins: [ApolloServerPluginInlineTraceDisabled()],
      driver: ApolloDriver,
      autoSchemaFile: false,
      playground: true,
      typePaths: ['./src/**/*.graphql'],
    }),
    ConfigModule,
    PrismaModule,
    HealthModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
