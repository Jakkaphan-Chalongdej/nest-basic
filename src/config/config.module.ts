import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app.config';
import DatabaseConfig from './database.config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }`,
      load: [
        () => ({ database: DatabaseConfig() }),
        () => ({ app: AppConfig() }),
      ],
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_LOGGING: Joi.boolean().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
        DB_DROP_SCHEMA: Joi.boolean().required(),
        DB_MIGRATIONS_RUN: Joi.boolean().required(),
        BASIC_USER: Joi.string().required(),
        BASIC_PASS: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
