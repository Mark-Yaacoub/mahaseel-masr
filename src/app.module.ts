import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { SendEmailModule } from './sendEmail/sendEmail.module';
import * as dotenv from 'dotenv';

dotenv.config()



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    
    MongooseModule.forRoot(process.env.DB_URL), UserModule, AuthModule, SendEmailModule,

  ],
  controllers: [AppController],
  providers: [AppService, AuthService], 
  
  
})


export class AppModule { }
console.log(process.env.DB_URL)
