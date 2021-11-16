import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { ForbiddenExceptionFilter } from './common/filters/forbidden-exception.filter';
import { InternalServerExceptionFilter } from './common/filters/internal-server-exception.filter';
import { PageNotFoundExceptionFilter } from './common/filters/page-not-found-exception.filter';
import { UnauthorizedExceptionFilter } from './common/filters/unauthorized-exception.filter';
import { ValidationException } from './common/filters/exceptions/validation.exception';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );

  app.useGlobalFilters(
    new InternalServerExceptionFilter(),
    new UnauthorizedExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new ValidationExceptionFilter(),
    new PageNotFoundExceptionFilter(),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  if (process.env.ENV !== 'production') {
    const { SwaggerModule, DocumentBuilder } = await import('@nestjs/swagger');
    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
  }

  await app.listen(3000);
}
bootstrap();
