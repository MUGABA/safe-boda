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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const request_riders_entity_1 = require("../../../models/request_riders.entity");
const user_entity_1 = require("../../../models/user.entity");
const typeorm_2 = require("typeorm");
let UsersRepository = exports.UsersRepository = class UsersRepository {
    constructor(userRepository, driverRequestRepository) {
        this.userRepository = userRepository;
        this.driverRequestRepository = driverRequestRepository;
    }
    async create(user) {
        return await this.userRepository.save(user);
    }
    async update(id, user) {
        await this.userRepository.update(id, user);
        return await this.userRepository.findOne({
            where: { id },
        });
    }
    async delete(id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        await this.userRepository.delete(id);
        return user;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        return await this.userRepository.findOne({
            where: { id },
        });
    }
    async findByEmail(email) {
        return await this.userRepository.find({
            where: { email },
        });
    }
    async userCustomerDetails(userId) {
        return await this.userRepository.findOne({
            where: { id: userId },
            relations: { requests: true },
            select: {
                requests: {
                    pickUpLocation: true,
                    destinationLocation: true,
                    status: true,
                    driverRequest: {
                        driver: { name: true, email: true, phoneNumber: true },
                    },
                },
            },
        });
    }
    async userDriverDetails(userId) {
        return await this.driverRequestRepository.find({
            where: { driver: { id: userId } },
            relations: { request: { customer: true }, driver: true },
        });
    }
};
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(request_riders_entity_1.DriverRequests)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=user.repository.js.map