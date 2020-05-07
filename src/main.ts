import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 3030;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Indri Store Web API')
    .setDescription('I sell, you buy')
    .setVersion('0.0.1')
    .addTag('Store')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap')
}
bootstrap();
