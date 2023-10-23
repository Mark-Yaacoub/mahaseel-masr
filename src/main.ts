import mongoose from 'mongoose';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // DATABASE CONNECT
  let db = process.env.DB_URL;
  mongoose
    .connect(db)
    .then(() => console.log('Database Connected'))
    .catch((e) => console.log(e));
  
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true, 
      transform: true, 
      transformOptions: { 
        enableImplicitConversion: true, 
      }, 
    }), 
  );  

  const options = new DocumentBuilder()
    .setTitle('User Management System')
    .setDescription('API for user management')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth(
      {
        description: `Please enter token in following format`,
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(5000);
  
}
bootstrap();
  