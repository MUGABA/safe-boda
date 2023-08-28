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
exports.RequestsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const request_entity_1 = require("../../../models/request.entity");
const request_riders_entity_1 = require("../../../models/request_riders.entity");
const typeorm_2 = require("typeorm");
let RequestsRepository = exports.RequestsRepository = class RequestsRepository {
    constructor(requestRepository, driverRequestRepository) {
        this.requestRepository = requestRepository;
        this.driverRequestRepository = driverRequestRepository;
    }
    async create(request) {
        return await this.requestRepository.save(request);
    }
    async update(id, request) {
        await this.requestRepository.update(id, request);
        return await this.requestRepository.findOne({
            where: { id },
        });
    }
    async findAll() {
        return await this.requestRepository.find();
    }
    async findOne(id) {
        return await this.requestRepository.findOne({
            where: { id },
            relations: { customer: true },
            select: {
                customer: { id: true, name: true },
            },
        });
    }
    async findRequestByUserAndStatus(createdBy) {
        return await this.requestRepository.find({
            where: { customer: { id: createdBy }, status: 'accepted' },
            select: {
                customer: { id: true, name: true, email: true, phoneNumber: true },
            },
        });
    }
    async findByStatus(status) {
        return await this.requestRepository.find({
            where: { status },
            relations: { customer: true },
            select: {
                customer: { id: true, name: true, email: true, phoneNumber: true },
            },
        });
    }
    async takeOnRequest(driverRequestDto) {
        return await this.driverRequestRepository.save(driverRequestDto);
    }
    async updateDriverRequest(driverRequest, driverRequestId) {
        await this.driverRequestRepository.update(driverRequestId, driverRequest);
        return this.findDriverRequestById(driverRequestId);
    }
    async findDriverRequestById(requestId) {
        return await this.driverRequestRepository.findOne({
            where: { request: { id: requestId } },
            relations: { driver: true, request: true },
        });
    }
    async findActiveDriverRequests(driverId) {
        return await this.driverRequestRepository.find({
            where: { driver: { id: driverId }, status: 'accepted' },
            relations: { driver: true, request: true },
        });
    }
};
exports.RequestsRepository = RequestsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(request_entity_1.Requests)),
    __param(1, (0, typeorm_1.InjectRepository)(request_riders_entity_1.DriverRequests)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RequestsRepository);
//# sourceMappingURL=request.repository.js.map