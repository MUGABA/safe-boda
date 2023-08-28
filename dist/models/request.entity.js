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
exports.Requests = void 0;
const requestStatus_1 = require("../helpers/requestStatus");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const request_riders_entity_1 = require("./request_riders.entity");
const user_entity_1 = require("./user.entity");
let Requests = exports.Requests = class Requests extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", Number)
], Requests.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Requests.prototype, "pickUpLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Requests.prototype, "destinationLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: requestStatus_1.requestStatus, default: 'pending' }),
    __metadata("design:type", String)
], Requests.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.requests),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Requests.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => request_riders_entity_1.DriverRequests, (driverRequest) => driverRequest.request),
    __metadata("design:type", request_riders_entity_1.DriverRequests)
], Requests.prototype, "driverRequest", void 0);
exports.Requests = Requests = __decorate([
    (0, typeorm_1.Entity)('requests')
], Requests);
//# sourceMappingURL=request.entity.js.map