import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, ReSendOtp, UpdatePasswordDto, UpdateUserDto, forgetPassword, verifyUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/shared/response';
import { MessageEnum } from 'src/shared/message.enum';
import { UserNotFoundException } from 'src/shared/not-found.exception';
import { SendEmailService } from 'src/send-email/send-email.service';
import { EmailDto, SendNewPassword } from 'src/send-email/dto/email.dto';




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

    async getProfileUser(Request): Promise<any> {
      const id = Request.user.userId;
      
      const user = await this.userModel.findOne({ _id: id }).select('-password -otp -verified -__v').exec();
      if (!user) {
        throw new UserNotFoundException('User not found');
      }
      return user;
    }

    async findUserById(id: string): Promise<User> {
      const user = await this.userModel.findOne({ _id: id }).select('-password -otp -verified -__v').exec();
      if (!user) {
        throw new UserNotFoundException('User not found');
      }
      return user;
    }

    async findUserAllDetailsById(id: string): Promise<User> {
      const user = await this.userModel.findOne({ _id: id })
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

    async updateUser(userId: string, dto: UpdateUserDto): Promise<Response<User>> {

       await this.findUserById(userId);
       
      try {
          const updatedUser = await this.userModel.findOneAndUpdate(
              { _id: userId },
              { $set: dto },
              { new: true }
          );
              
          return {
              messageEn: MessageEnum.UpdateSuccessEn,
              messageAr: MessageEnum.UpdateSuccessAr,
              status: 200,
              data: updatedUser,
          };
      } catch (error) {
          if (error.code === 11000) {
              return {
                  status: 400,
                  messageEn: MessageEnum.EmailExistEn,
                  messageAr: MessageEnum.EmailExistAr,
              };
          }
      }
  }
  
  async findAllUsers(page: number , limit: number, ) {
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
  
  

  generateRandomOTP(): string {
    const min = 1000;
    const max = 9999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp.toString();
  }


  async forgetPassword(dto: forgetPassword): Promise<any> {
    const userData = await this.findUserByEmail(dto.email);
    
    const password = await this.generateRandomPassword();
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userData._id },
      { $set: { password: hashedPassword } },
      { new: true }
    );
  
    const sendNewPassword = new SendNewPassword();
  
    sendNewPassword.recipient = updatedUser.email;  
    sendNewPassword.password = password;
  
    let sendEmail = await this.sendEmailService.sendEmailNewPassword(sendNewPassword);

  return {
    status: 200,
    messageEn: MessageEnum.ForgetPasswordSuccessEn,
    messageAr: MessageEnum.ForgetPasswordSuccessAr,
  }
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto): Promise<Response<User>> {
    
    const user = await this.findUserAllDetailsById(userId)
      
    if (!user) {
      return {
        status: 400,
        messageEn: MessageEnum.UserNotFoundEn,
        messageAr: MessageEnum.UserNotFoundAr,
      };
    }
  
    const isCurrentPasswordValid = await this.checkCurrentPasswordValidity(dto.currentPassword, userId);
  
    if (!isCurrentPasswordValid) {
      return {
        status: 400,
        messageEn: MessageEnum.CurrentPasswordNotValidEn,
        messageAr: MessageEnum.CurrentPasswordNotValidAr,
      };
    }
  
  
    const newHashedPassword = await bcrypt.hash(dto.password, 10);
  
    user.password = newHashedPassword;
  
    await user.save();
  
    return {
      status: 200,
      messageEn: MessageEnum.PasswordUpdatedEn,
      messageAr: MessageEnum.PasswordUpdatedAr,
    };
  }
  
  
async checkCurrentPasswordValidity(currentPassword: string, userId: string): Promise<boolean> {
  const user = await this.userModel.findOne({ _id: userId }).exec();

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  console.log(isPasswordValid);
  
  return isPasswordValid;
}

async deleteUser(userId: string): Promise<Response<User>> {
    const user =  await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      return {
        status: 400,
        messageEn: MessageEnum.UserNotFoundEn,
        messageAr: MessageEnum.UserNotFoundAr,
      };
    }
  return {
    status: 200,
    messageEn: MessageEnum.DeleteUserSuccessEn,
    messageAr: MessageEnum.DeleteUserSuccessAr,
  };
}

  async generateRandomPassword(): Promise<string> {
    const passwordPattern =
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const passwordLength = 8;
    let password = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    if (!password.match(passwordPattern)) {
      return password;
    }

    return password;
  }

  


}
