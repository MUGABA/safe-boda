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
exports.DriverRequests = void 0;
const requestStatus_1 = require("../helpers/requestStatus");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const request_entity_1 = require("./request.entity");
const user_entity_1 = require("./user.entity");
let DriverRequests = exports.DriverRequests = class DriverRequests extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", Number)
], DriverRequests.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: requestStatus_1.requestStatus, default: 'accepted' }),
    __metadata("design:type", String)
], DriverRequests.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.driverRequest),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], DriverRequests.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => request_entity_1.Requests, (request) => request.driverRequest),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", request_entity_1.Requests)
], DriverRequests.prototype, "request", void 0);
exports.DriverRequests = DriverRequests = __decorate([
    (0, typeorm_1.Entity)('driver_requests')
], DriverRequests);
//# sourceMappingURL=request_riders.entity.js.map