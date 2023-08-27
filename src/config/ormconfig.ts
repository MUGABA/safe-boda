import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from './config.service';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: configService.getValue(''),
  host: configService.getValue('POSTGRES_HOST'),
  logging: true,
  synchronize: false,
  autoLoadEntities: true,
  entities: ['./src/models/**.entity{.ts,.js}'],
  migrations: ['./src/migrations/*{.ts,.js}'],
} as DataSourceOptions);
