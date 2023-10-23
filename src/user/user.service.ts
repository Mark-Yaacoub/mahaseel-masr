import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, ReSendOtp, verifyUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/shared/response';
import { MessageEnum } from 'src/shared/message.enum';
import { SendEmailService } from 'src/sendEmail/sendEmail.service';
import { UserNotFoundException } from 'src/shared/not-found.exception';
import { EmailDto } from 'src/SendEmail/dto/email.dto';




@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument> ,
  private sendEmailService: SendEmailService

  )
  { }

  async findUser(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }

  async registerUser(createUserDto: CreateUserDto): Promise<Response<User>> {
      const { firstName, lastName, userName, email, dateOfBirth, profilePicture, password } = createUserDto;

      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        return {
          status: 400,
          messageEn: MessageEnum.EmailExistEn,
          messageAr: MessageEnum.EmailExistAr,
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

      const emailBody = new EmailDto();
      emailBody.recipient = savedUser.email;
      emailBody.otp = savedUser.otp;
      
       await this.sendEmailService.sendEmailOtp(emailBody);
      return {
        status: 201,
        data: savedUser,
        messageEn: MessageEnum.CreateUserSuccessEn,
        messageAr: MessageEnum.CreateUserSuccessAr,
      };
    } 

    async findUserByEmail(email: string): Promise<User> {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UserNotFoundException('User not found');
      }
      return user;
    }

  async comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }

  async reSendOtp(dto: ReSendOtp): Promise<any> {
      const user = await this.findUserByEmail(dto.email);

      const otp = this.generateRandomOTP();
      const newOtp =  user.otp = parseInt(otp);
      await user.save();
      
      let emailBody = new EmailDto();

      emailBody.recipient = user.email;
      emailBody.otp = newOtp; 


      let sendEmail = await this.sendEmailService.sendEmailOtp(emailBody);

      return {
        status: 200,
        message: 'A new OTP has been sent to your registered email',
      };
    
  }

  async verifyUser(dto: verifyUserDto): Promise<Response<User>> {

      const user = await this.findUserByEmail(dto.email);
      // if(!user) {
      //   return {
      //     status: 400,
      //     messageEn: MessageEnum.EmailNotExistEn,
      //     messageAr: MessageEnum.EmailNotExistAr,
      //   };
      // }
      
      if (user.otp !== dto.otp) {
        return {
          status: 400,
          messageEn: MessageEnum.OtpNotValidEn,
          messageAr: MessageEnum.OtpNotValidAr,
        };
      }
  
      user.verified = 1;
      await user.save();
      
      return {
        status: 200,
        data: user,       
        messageEn: MessageEnum.verifiedEn,
        messageAr: MessageEnum.verifiedAr,
      };
    }
  
  

  generateRandomOTP(): string {
    const min = 1000;
    const max = 9999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp.toString();
  }

}
