"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInstanceFactory = void 0;
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const app_module_1 = require("../../app.module");
class AppInstanceFactory {
    constructor(appInstance, dataSource) {
        this.appInstance = appInstance;
        this.dataSource = dataSource;
    }
    get instance() {
        return this.appInstance;
    }
    get dbSource() {
        return this.dataSource;
    }
    static async new() {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        const app = module.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidUnknownValues: true,
            stopAtFirstError: true,
            validateCustomDecorators: true,
        }));
        await app.init();
        const dataSource = module.get((0, typeorm_1.getDataSourceToken)());
        return new AppInstanceFactory(app, dataSource);
    }
    async close() {
        await this.appInstance.close();
    }
    async cleanupDB() {
        const tables = this.dataSource.manager.connection.entityMetadatas.map((entity) => `${entity.tableName}`);
        for (const table of tables) {
            await this.dataSource.manager.connection.query(`DELETE FROM ${table} CASCADE;`);
        }
    }
}
exports.AppInstanceFactory = AppInstanceFactory;
//# sourceMappingURL=appInstance.factory.js.map