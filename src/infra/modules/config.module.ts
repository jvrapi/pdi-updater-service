import { Module } from '@nestjs/common';
import { ConfigModule as NestJsConfigModule } from '@nestjs/config';

@Module({
  imports: [NestJsConfigModule.forRoot({ isGlobal: true })],
  exports: [NestJsConfigModule.forRoot({ isGlobal: true })],
})
export class ConfigModule {}
