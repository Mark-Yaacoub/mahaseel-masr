import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/shared/response';
import { MessageEnum } from 'src/shared/message.enum';




@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async createUser(createUserDto: CreateUserDto): Promise<Response<User>> {
    const { first_name, last_name, username, email, Date_of_birth, profile_picture, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      return {
        status: 400,
        messageEn: MessageEnum.EmailExistEn,
        messageAr: MessageEnum.EmailExistAr,
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      first_name,
      last_name,
      username,
      email,
      Date_of_birth,
      profile_picture,
      password: hashedPassword,
    });

    const savedUser = await createdUser.save();

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


}
