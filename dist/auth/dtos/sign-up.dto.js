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
exports.SignUpDto = void 0;
const authTypes_1 = require("../../helpers/authTypes");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SignUpDto {
    constructor() {
        this.isDriverAvailable = false;
    }
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Muhamad Rashid Mugaba',
        description: `User's name`,
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@safeboda.com',
        description: 'User Email',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password of user',
        example: 'Pass#123',
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'password too short',
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'password too long',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '256799067989',
        description: `User's Contact number`,
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'true',
        description: `Checks where user is available of not.`,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], SignUpDto.prototype, "isDriverAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Either Customer, Admin or Driver',
        description: `User's name`,
    }),
    (0, class_validator_1.IsEnum)(authTypes_1.userTypes),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "userType", void 0);
//# sourceMappingURL=sign-up.dto.js.map