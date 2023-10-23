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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_dto_1 = require("../user/dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("../user/user.service");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(dto) {
        return await this.authService.loginUser(dto);
    }
    async registerUser(createUserDto) {
        return await this.userService.registerUser(createUserDto);
    }
    async reSendOtp(dto) {
        return await this.userService.reSendOtp(dto);
    }
    async verifyUser(dto) {
        return await this.userService.verifyUser(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User Login' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.LoginDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user', description: 'Register a new user' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiBody)({ type: user_dto_1.CreateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('reSendOtp'),
    (0, swagger_1.ApiOperation)({ summary: 'Re-send OTP', description: 'Re-send OTP to a user' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiBody)({ type: user_dto_1.ReSendOtp }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ReSendOtp]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reSendOtp", null);
__decorate([
    (0, common_1.Post)('/verifyUser'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify user using OTP' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.verifyUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User not found or invalid OTP' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.verifyUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map