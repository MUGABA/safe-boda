import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      console.log(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.getValue('DB_URI'),
      host: this.getValue('POSTGRES_HOST'),
      entities: [
        __dirname + '/**/*.entity.ts',
        __dirname + '/src/**/*.entity.js',
      ],
      migrationsTableName: 'migration',
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      ssl: this.isProduction(),
      logging: ['query', 'error'],
      connectTimeoutMS: 30000,
      migrationsRun: false,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues(['DB_URI']);

export { configService };
