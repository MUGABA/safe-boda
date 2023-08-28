"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
const path_1 = require("path");
let TypeOrmConfigService = exports.TypeOrmConfigService = class TypeOrmConfigService {
    createTypeOrmOptions() {
        return {
            migrationsTableName: 'migrations',
            type: 'postgres',
            host: config_service_1.configService.getValue('POSTGRES_HOST'),
            port: parseInt(config_service_1.configService.getValue('POSTGRES_PORT')),
            username: config_service_1.configService.getValue('POSTGRES_USER'),
            password: config_service_1.configService.getValue('POSTGRES_PASSWORD'),
            database: config_service_1.configService.getValue('POSTGRES_DATABASE'),
            logging: true,
            synchronize: false,
            autoLoadEntities: true,
            entities: [(0, path_1.join)(__dirname, '..', 'models/**/*.entity.{ts,js}')],
            migrations: [(0, path_1.join)(__dirname, '..', 'migrations/**/*.entity.{ts,js}')],
        };
    }
};
exports.TypeOrmConfigService = TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)()
], TypeOrmConfigService);
//# sourceMappingURL=typeormconfig.service.js.map