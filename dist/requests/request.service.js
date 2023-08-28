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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user/domain/repository/user.repository");
const request_repository_1 = require("./domains/repository/request.repository");
const driverRequest_dto_1 = require("./dtos/driverRequest.dto");
let RequestService = exports.RequestService = class RequestService {
    constructor(requestRepository, usersRepository) {
        this.requestRepository = requestRepository;
        this.usersRepository = usersRepository;
    }
    async makeRequest(request, userId) {
        try {
            const checkUserHasActiveRide = await this.requestRepository.findRequestByUserAndStatus(userId);
            if (checkUserHasActiveRide.length) {
                throw new common_1.BadRequestException({
                    status: 400,
                    message: 'Sorry you already have an active ride',
                });
            }
            request.customer = await this.usersRepository.findOne(userId);
            const requestedRide = await this.requestRepository.create(request);
            delete requestedRide.customer.password;
            return requestedRide;
        }
        catch (error) {
            throw error;
        }
    }
    async findByStatus(status) {
        return await this.requestRepository.findByStatus(status);
    }
    async takeOnRequest(requestId, driverId) {
        try {
            const activeDriverRequest = await this.requestRepository.findActiveDriverRequests(driverId);
            if (activeDriverRequest.length >= 1) {
                throw new common_1.BadRequestException({
                    status: 400,
                    message: 'You already have a running customer',
                });
            }
            const driverRequestDto = new driverRequest_dto_1.DriverRequestDto();
            const request = await this.requestRepository.findOne(requestId);
            if (request.status !== 'pending') {
                throw new common_1.BadRequestException({
                    status: 400,
                    message: 'Trip already taken',
                });
            }
            driverRequestDto.driver = await this.usersRepository.findOne(driverId);
            driverRequestDto.request = request;
            driverRequestDto.status = 'accepted';
            request.status = 'accepted';
            await this.requestRepository.update(requestId, request);
            const driverRequest = await this.requestRepository.takeOnRequest(driverRequestDto);
            delete driverRequest.driver.password;
            return driverRequest;
        }
        catch (error) {
            throw error;
        }
    }
    async updateDriverRequest(driverRequestId, status, currentUser) {
        {
            try {
                const driverRequest = await this.requestRepository.findDriverRequestById(driverRequestId);
                const getRequest = await this.requestRepository.findOne(driverRequest.request.id);
                if ((currentUser.userType === 'Driver' &&
                    driverRequest.driver.id !== currentUser.id) ||
                    (currentUser.userType === 'Customer' &&
                        getRequest.customer.id !== currentUser.id)) {
                    throw new common_1.BadRequestException({
                        status: 400,
                        message: 'You can not update a request you are not involved in',
                    });
                }
                const request = driverRequest.request;
                request.status = status;
                await this.requestRepository.update(driverRequest.request.id, request);
                driverRequest.status = status;
                return await this.requestRepository.updateDriverRequest(driverRequest, driverRequest.id);
            }
            catch (error) {
                throw error;
            }
        }
    }
};
exports.RequestService = RequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [request_repository_1.RequestsRepository,
        user_repository_1.UsersRepository])
], RequestService);
//# sourceMappingURL=request.service.js.map