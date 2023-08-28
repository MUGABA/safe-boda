"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const typeorm_1 = require("typeorm");
const config_service_1 = require("./config.service");
exports.connectionSource = new typeorm_1.DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    url: config_service_1.configService.getValue(''),
    host: config_service_1.configService.getValue('POSTGRES_HOST'),
    logging: true,
    synchronize: false,
    autoLoadEntities: true,
    entities: ['./src/models/**.entity{.ts,.js}'],
    migrations: ['./src/migrations/*{.ts,.js}'],
});
//# sourceMappingURL=ormconfig.js.map