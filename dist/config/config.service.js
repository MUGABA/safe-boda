"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = void 0;
require('dotenv').config();
class ConfigService {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            console.log(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }
    getPort() {
        return this.getValue('PORT', true);
    }
    isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }
    getTypeOrmConfig() {
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
exports.configService = configService;
//# sourceMappingURL=config.service.js.map