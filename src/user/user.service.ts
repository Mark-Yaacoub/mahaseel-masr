import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/shared/response';
import { MessageEnum } from 'src/shared/message.enum';
import { SendEmailService } from 'src/SendEmail/sendemail.service';
import { EmailDto } from 'src/SendEmail/dto/email.dto';




@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument> ,
  private sendEmailService: SendEmailService

  )
  { }

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
    return this.userModel.findOne({ email }).exec();
  }

  async comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }

}
