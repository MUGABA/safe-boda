"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sign_up_dto_1 = require("./dtos/sign-up.dto");
const auth_service_1 = require("./services/auth.service");
const PublicRoute_decorator_1 = require("../helpers/decorators/PublicRoute.decorator");
const sign_in_dto_1 = require("./dtos/sign-in.dto");
const driver_guard_1 = require("./guards/driver.guard");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signUpDto) {
        return await this.authService.signUp(signUpDto);
    }
    signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    async toggleDriverIsAvailable(req) {
        return await this.authService.toggleDriverAvailable(req.user);
    }
};
__decorate([
    (0, swagger_1.ApiConflictResponse)({
        description: 'User already exists',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Return errors for invalid sign up fields',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User has been successfully signed up',
    }),
    (0, PublicRoute_decorator_1.Public)(),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Return errors for invalid sign in fields',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'User has been successfully signed in' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, PublicRoute_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Returns error incase user fails to update availability',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Driver successfully updated his/her availability',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(driver_guard_1.DriverGuard),
    (0, common_1.Patch)('toggle-available'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "toggleDriverIsAvailable", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map