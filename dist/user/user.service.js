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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const message_enum_1 = require("../shared/message.enum");
const sendEmail_service_1 = require("../sendEmail/sendEmail.service");
const not_found_exception_1 = require("../shared/not-found.exception");
const email_dto_1 = require("../SendEmail/dto/email.dto");
let UserService = class UserService {
    constructor(userModel, sendEmailService) {
        this.userModel = userModel;
        this.sendEmailService = sendEmailService;
    }
    async findUser(email) {
        const user = await this.userModel.findOne({ email }).exec();
        return !!user;
    }
    async registerUser(createUserDto) {
        const { firstName, lastName, userName, email, dateOfBirth, profilePicture, password } = createUserDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            return {
                status: 400,
                messageEn: message_enum_1.MessageEnum.EmailExistEn,
                messageAr: message_enum_1.MessageEnum.EmailExistAr,
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({
            firstName,
            lastName,
            userName,
            email,
            dateOfBirth,
            profilePicture,
            password: hashedPassword,
        });
        const savedUser = await createdUser.save();
        const emailBody = new email_dto_1.EmailDto();
        emailBody.recipient = savedUser.email;
        emailBody.otp = savedUser.otp;
        await this.sendEmailService.sendEmailOtp(emailBody);
        return {
            status: 201,
            data: savedUser,
            messageEn: message_enum_1.MessageEnum.CreateUserSuccessEn,
            messageAr: message_enum_1.MessageEnum.CreateUserSuccessAr,
        };
    }
    async findUserByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new not_found_exception_1.UserNotFoundException('User not found');
        }
        return user;
    }
    async findUserById(id) {
        const user = await this.userModel.findOne({ _id: id }).select('-password -otp -verified -__v').exec();
        if (!user) {
            throw new not_found_exception_1.UserNotFoundException('User not found');
        }
        return user;
    }
    async comparePasswords(enteredPassword, hashedPassword) {
        return bcrypt.compare(enteredPassword, hashedPassword);
    }
    async reSendOtp(dto) {
        const user = await this.findUserByEmail(dto.email);
        const otp = this.generateRandomOTP();
        const newOtp = user.otp = parseInt(otp);
        await user.save();
        let emailBody = new email_dto_1.EmailDto();
        emailBody.recipient = user.email;
        emailBody.otp = newOtp;
        let sendEmail = await this.sendEmailService.sendEmailOtp(emailBody);
        return {
            status: 200,
            message: 'A new OTP has been sent to your registered email',
        };
    }
    async verifyUser(dto) {
        const user = await this.findUserByEmail(dto.email);
        if (user.otp !== dto.otp) {
            return {
                status: 400,
                messageEn: message_enum_1.MessageEnum.OtpNotValidEn,
                messageAr: message_enum_1.MessageEnum.OtpNotValidAr,
            };
        }
        user.verified = 1;
        await user.save();
        return {
            status: 200,
            data: user,
            messageEn: message_enum_1.MessageEnum.verifiedEn,
            messageAr: message_enum_1.MessageEnum.verifiedAr,
        };
    }
    async updateUser(userId, dto) {
        await this.findUserById(userId);
        try {
            const updatedUser = await this.userModel.findOneAndUpdate({ _id: userId }, { $set: dto }, { new: true });
            return {
                messageEn: message_enum_1.MessageEnum.UpdateSuccessEn,
                messageAr: message_enum_1.MessageEnum.UpdateSuccessAr,
                status: 200,
                data: updatedUser,
            };
        }
        catch (error) {
            console.log(error);
            if (error.code === 11000) {
                return {
                    status: 400,
                    messageEn: message_enum_1.MessageEnum.EmailExistEn,
                    messageAr: message_enum_1.MessageEnum.EmailExistAr,
                };
            }
        }
    }
    async findAllUsers(page, limit) {
        const skip = (page - 1) * limit;
        let query = this.userModel.find();
        const users = await query
            .skip(skip)
            .limit(limit);
        const totalUsers = await this.userModel.countDocuments();
        return {
            data: users,
            page,
            limit,
            totalCount: totalUsers,
        };
    }
    generateRandomOTP() {
        const min = 1000;
        const max = 9999;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        return otp.toString();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        sendEmail_service_1.SendEmailService])
], UserService);
//# sourceMappingURL=user.service.js.map