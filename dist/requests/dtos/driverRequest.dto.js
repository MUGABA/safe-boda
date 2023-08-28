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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRequestDto = void 0;
const requestStatus_1 = require("../../helpers/requestStatus");
const request_entity_1 = require("../../models/request.entity");
const user_entity_1 = require("../../models/user.entity");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DriverRequestDto {
    constructor() {
        this.status = 'accepted';
    }
}
exports.DriverRequestDto = DriverRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Request Driver is working with',
        example: '1',
    }),
    __metadata("design:type", request_entity_1.Requests)
], DriverRequestDto.prototype, "request", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Driver engaging on the customer Request',
        example: '1',
    }),
    __metadata("design:type", user_entity_1.User)
], DriverRequestDto.prototype, "driver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'canceled/pending',
        description: `Request status`,
    }),
    (0, class_validator_1.IsEnum)(requestStatus_1.requestStatus),
    __metadata("design:type", String)
], DriverRequestDto.prototype, "status", void 0);
//# sourceMappingURL=driverRequest.dto.js.map