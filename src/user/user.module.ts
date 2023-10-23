import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { SendEmailModule } from 'src/sendEmail/sendEmail.module';
import { AuthModule } from 'src/auth/auth.module';
import { CheckUserRoleMiddleware } from 'src/check-user-role/check-user-role.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) ,
  SendEmailModule ,AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]

})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserRoleMiddleware)
      .forRoutes(
        UserController
      );
  }
}
