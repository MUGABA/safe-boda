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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const password_service_1 = require("./password.service");
const jwt_config_1 = require("../../config/jwt.config");
const user_repository_1 = require("../../user/domain/repository/user.repository");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtConfiguration, passwordService, jwtService, userRepository) {
        this.jwtConfiguration = jwtConfiguration;
        this.passwordService = passwordService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async signUp(signUpDto) {
        const { email, password, userType } = signUpDto;
        try {
            signUpDto.password = await this.passwordService.hash(password);
            if (userType === 'Driver')
                signUpDto.isDriverAvailable = true;
            else
                signUpDto.isDriverAvailable = false;
            const userExists = await this.userRepository.findByEmail(email);
            if (userExists.length >= 1) {
                throw new common_1.BadRequestException({
                    status: 400,
                    message: 'User with this email already exist. Try sign in',
                });
            }
            const savedUSer = await this.userRepository.create(signUpDto);
            const { accessToken } = await this.generateAccessToken(savedUSer);
            delete savedUSer.password;
            const returnObject = {
                message: 'Registration completed successfully',
                accessToken,
                user: savedUSer,
            };
            return returnObject;
        }
        catch (error) {
            throw error;
        }
    }
    async signIn(signInDto) {
        try {
            const { email, password } = signInDto;
            const checkUserExists = await this.userRepository.findByEmail(email);
            if (!checkUserExists.length) {
                throw new common_1.BadRequestException('Wrong Email or password');
            }
            const user = checkUserExists[0];
            const isPasswordMatch = await this.passwordService.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new common_1.BadRequestException('Wrong Email or Password');
            }
            const { accessToken } = await this.generateAccessToken(user);
            delete user.password;
            const returnObject = {
                message: 'Logged In Successfully',
                accessToken,
                user: user,
            };
            return returnObject;
        }
        catch (error) {
            throw error;
        }
    }
    async toggleDriverAvailable(currentUser) {
        try {
            const currentUserData = await this.userRepository.findOne(currentUser.id);
            currentUserData.isDriverAvailable = !currentUserData.isDriverAvailable;
            return await this.userRepository.update(currentUser.id, currentUserData);
        }
        catch (error) {
            throw error;
        }
    }
    async generateAccessToken(user) {
        const tokenId = (0, crypto_1.randomUUID)();
        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
            userType: user.userType,
            isDriverAvailable: user.isDriverAvailable,
            tokenId,
        }, {
            secret: this.jwtConfiguration.secret,
            expiresIn: this.jwtConfiguration.accessTokenTtl,
        });
        return { accessToken };
    }
    async getMyProfile(currentUser) {
        try {
            if (currentUser.userType === 'Customer')
                return this.userRepository.userCustomerDetails(currentUser.id);
            else if (currentUser.userType === 'Driver')
                return this.userRepository.userDriverDetails(currentUser.id);
            else
                return this.userRepository.findOne(currentUser.id);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0, password_service_1.PasswordService,
        jwt_1.JwtService,
        user_repository_1.UsersRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map