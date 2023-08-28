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
exports.RequestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_gaurd_1 = require("../auth/guards/customer.gaurd");
const driver_guard_1 = require("../auth/guards/driver.guard");
const request_dto_1 = require("./dtos/request.dto");
const request_service_1 = require("./request.service");
let RequestController = exports.RequestController = class RequestController {
    constructor(requestService) {
        this.requestService = requestService;
    }
    async makeRideRequest(requestDto, req) {
        const currentUser = req.user;
        return await this.requestService.makeRequest(requestDto, currentUser.id);
    }
    async getAllRidesThatNeedARider() {
        return await this.requestService.findByStatus('pending');
    }
    async takeOverRequest(req, params) {
        const currentUser = req.user;
        const { requestId } = params;
        return await this.requestService.takeOnRequest(requestId, currentUser.id);
    }
    async updateDriverRequest(req, params) {
        const currentUser = req.user;
        const { requestId, status } = params;
        return await this.requestService.updateDriverRequest(requestId, status, currentUser);
    }
};
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Return errors for invalid fields',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Request has been successfully created',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(customer_gaurd_1.CustomerGuard),
    (0, common_1.Post)('request-ride'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestDto, Object]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "makeRideRequest", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns all pending requests from customers',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(driver_guard_1.DriverGuard),
    (0, common_1.Get)('customer-requests'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "getAllRidesThatNeedARider", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(driver_guard_1.DriverGuard),
    (0, common_1.Post)('take-request/:requestId/'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "takeOverRequest", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)('update-request/:requestId/:status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "updateDriverRequest", null);
exports.RequestController = RequestController = __decorate([
    (0, swagger_1.ApiTags)('requests'),
    (0, common_1.Controller)('requests'),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], RequestController);
//# sourceMappingURL=request.controller.js.map