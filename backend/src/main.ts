import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);

  // configuration for Swagger
  const config = new DocumentBuilder()
    .setTitle('Certificate API')
    .setDescription('API for generating and managing certificates')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  app.enableCors();
  await app.listen(configService.get('PORT') ?? 3001);

  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`📃 Documentation is running on: ${await app.getUrl()}/api-doc`);
}

bootstrap();
