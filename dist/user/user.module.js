"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../models/user.entity");
const user_repository_interface_1 = require("./domain/interface/user.repository.interface");
const user_service_interface_1 = require("./domain/interface/user.service.interface");
const user_repository_1 = require("./domain/repository/user.repository");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [user_controller_1.UserController],
        providers: [
            {
                provide: user_service_interface_1.IUserService,
                useClass: user_service_1.UserService,
            },
            {
                provide: user_repository_interface_1.IUserRepository,
                useClass: user_repository_1.UsersRepository,
            },
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map