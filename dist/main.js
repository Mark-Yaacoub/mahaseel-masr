"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    let db = process.env.DB_URL;
    mongoose_1.default
        .connect(db)
        .then(() => console.log('Database Connected'))
        .catch((e) => console.log(e));
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('User Management System')
        .setDescription('API for user management')
        .setVersion('1.0')
        .addTag('users')
        .addBearerAuth({
        description: `Please enter token in following format`,
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
        in: 'Header',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map