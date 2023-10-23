import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { SendEmailModule } from 'src/sendEmail/sendEmail.module';

@Module({
  providers: [AuthService, JwtStrategy],     
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '12h', 
      },
    }),
    UserModule,
  ],
  exports: [JwtStrategy, PassportModule, JwtModule], 
})
export class AuthModule {}
