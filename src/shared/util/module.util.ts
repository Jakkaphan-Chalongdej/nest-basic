import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilService } from './service.util';

@Module({
  imports: [ConfigModule],
  providers: [UtilService],
  exports: [UtilService],
})
export class UtilModule {}
