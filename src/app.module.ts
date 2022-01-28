import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UtilModule } from './shared/util/module.util';

@Module({
  imports: [DatabaseModule, ConfigModule, AuthModule, ApiModule, UtilModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
