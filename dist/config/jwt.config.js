"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => {
    return {
        secret: process.env.JWT_SECRET,
        accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL,
    };
});
//# sourceMappingURL=jwt.config.js.map