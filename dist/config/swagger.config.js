"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('swagger', () => {
    return {
        siteTitle: process.env.SWAGGER_SITE_TITLE,
        docTitle: process.env.SWAGGER_DOC_TITLE,
        docDescription: process.env.SWAGGER_DOC_DESCRIPTION,
        docVersion: process.env.SWAGGER_DOC_VERSION,
    };
});
//# sourceMappingURL=swagger.config.js.map