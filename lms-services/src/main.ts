import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './base/response.interceptor';
import { ErrorsInterceptor } from './base/error.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('LMS API Document')
    .setDescription('This is all the available API for the LMS application')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', schema: 'Bearer', bearerFormat: 'Token' } as SecuritySchemeObject, 'Bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
