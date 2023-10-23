import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { SendEmailModule } from 'src/sendEmail/sendEmail.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) ,
  SendEmailModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]

})
export class UserModule {}
