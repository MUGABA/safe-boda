import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configService } from './config.service';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      migrationsTableName: 'migrations',
      type: 'postgres',
      host: configService.getValue('POSTGRES_HOST'),
      port: parseInt(configService.getValue('POSTGRES_PORT')),
      username: configService.getValue('POSTGRES_USER'),
      password: configService.getValue('POSTGRES_PASSWORD'),
      database: configService.getValue('POSTGRES_DATABASE'),
      logging: true,
      synchronize: false,
      autoLoadEntities: true,
      entities: [join(__dirname, '..', 'models/**/*.entity.{ts,js}')],
      migrations: [join(__dirname, '..', 'migrations/**/*.entity.{ts,js}')],
    };
  }
}
