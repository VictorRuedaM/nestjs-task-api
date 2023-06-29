import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const whiteList = process.env.CLIENT_URL;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: whiteList });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
