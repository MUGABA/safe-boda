import { INestApplication, Type, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { getDataSourceToken } from '@nestjs/typeorm';

import { AppModule } from 'src/app.module';

export class AppInstanceFactory {
  private constructor(
    private readonly appInstance: INestApplication,
    private readonly dataSource: DataSource,
  ) {}

  get instance() {
    return this.appInstance;
  }

  get dbSource() {
    return this.dataSource;
  }

  static async new() {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
        stopAtFirstError: true,
        validateCustomDecorators: true,
      }),
    );

    await app.init();

    const dataSource = module.get<DataSource>(
      getDataSourceToken() as Type<DataSource>,
    );

    return new AppInstanceFactory(app, dataSource);
  }

  async close() {
    await this.appInstance.close();
  }

  async cleanupDB() {
    const tables = this.dataSource.manager.connection.entityMetadatas.map(
      (entity) => `${entity.tableName}`,
    );

    for (const table of tables) {
      await this.dataSource.manager.connection.query(
        `DELETE FROM ${table} CASCADE;`,
      );
    }
  }
}
