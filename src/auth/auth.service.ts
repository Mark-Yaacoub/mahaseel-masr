import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { jwtPayloadUser } from './auth.model';
import { JwtService } from '@nestjs/jwt';
import { MessageEnum } from 'src/shared/message.enum';
import { ResponseLogin, UserResponse } from 'src/user/dto/user.respon';



@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }


    async loginUser(dto: LoginDto): Promise<ResponseLogin<UserResponse>> {
        const user = await this.userService.findUserByEmail(dto.email);        
        if (!user) {
            return {
                status: 400,
                messageEn: MessageEnum.ValidDataEn,
                messageAr: MessageEnum.ValidDataAr,
            };
        } 
        const isPasswordValid = await this.userService.comparePasswords(dto.password, user.password);            
        if (!isPasswordValid) {
            return {
                status: 400,
                messageEn: MessageEnum.ValidDataEn,
                messageAr: MessageEnum.ValidDataAr,
            };        
        }

        if(user.verified === 0){
            return {
                status: 400,
                messageEn: MessageEnum.UserNotVerifiedEn,
                messageAr: MessageEnum.UserNotVerifiedAr,
            };

        }
        const payload: jwtPayloadUser = {
            email: user.email,
            userId: user.id,
            userRole: user.userRole
        };

        const responseData : UserResponse = {
            accessToken: this.jwtService.sign(payload),
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            profilePicture: user.profilePicture,
            verified : user.verified,
            userRole: user.userRole,
            otp : user.otp,
            dateOfBirth: user.dateOfBirth,
        };
    
        return { status: 200, data: responseData};
    }

    // async registerUser(createUserDto: CreateUserDto) : Promise<Response<User>> {
        
    //     const user = await this.userService.createUser(createUserDto);

    //     console.log(user);

    //     let emailBody = new EmailDto();
    //     emailBody.recipient = user.data.email;
    //     emailBody.otp = user.data.otp;

    //     console.log(emailBody);
        
    //     let sendEmail = await this.sendEmailService.sendEmailOtp(emailBody);
    //     console.log(sendEmail);
        
    //     return user;
    // }

}
