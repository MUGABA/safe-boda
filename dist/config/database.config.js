"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => {
    return {
        type: 'postgres',
        url: process.env.DB_URI,
    };
});
//# sourceMappingURL=database.config.js.map