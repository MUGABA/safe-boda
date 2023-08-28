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
exports.RequestDto = void 0;
const requestStatus_1 = require("../../helpers/requestStatus");
const user_entity_1 = require("../../models/user.entity");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RequestDto {
    constructor() {
        this.status = 'pending';
    }
}
exports.RequestDto = RequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pick up location for the user',
        description: `Customer pick up location`,
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RequestDto.prototype, "pickUpLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Destination Location',
        description: 'Customer destination Location',
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RequestDto.prototype, "destinationLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer requesting for a ride',
        example: '1',
    }),
    __metadata("design:type", user_entity_1.User)
], RequestDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'canceled/pending',
        description: `Request status`,
    }),
    (0, class_validator_1.IsEnum)(requestStatus_1.requestStatus),
    __metadata("design:type", String)
], RequestDto.prototype, "status", void 0);
//# sourceMappingURL=request.dto.js.map