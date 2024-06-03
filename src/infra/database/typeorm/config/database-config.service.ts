import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvService } from '~/app/services/env';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly envService: EnvService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.envService.get('DB_HOST'),
      port: Number(this.envService.get('DB_PORT')),
      username: this.envService.get('DB_USERNAME'),
      password: this.envService.get('DB_PASSWORD'),
      database: this.envService.get('DB_NAME'),
      autoLoadEntities: true,
      // logging: true,
    };
  }
}
