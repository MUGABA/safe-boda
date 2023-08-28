"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const request_entity_1 = require("../models/request.entity");
const request_riders_entity_1 = require("../models/request_riders.entity");
const user_entity_1 = require("../models/user.entity");
const user_repository_1 = require("../user/domain/repository/user.repository");
const request_repository_1 = require("./domains/repository/request.repository");
const request_controller_1 = require("./request.controller");
const request_service_1 = require("./request.service");
let RequestModule = exports.RequestModule = class RequestModule {
};
exports.RequestModule = RequestModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([request_entity_1.Requests, user_entity_1.User, request_riders_entity_1.DriverRequests])],
        controllers: [request_controller_1.RequestController],
        providers: [request_service_1.RequestService, request_repository_1.RequestsRepository, user_repository_1.UsersRepository],
        exports: [],
    })
], RequestModule);
//# sourceMappingURL=request.module.js.map