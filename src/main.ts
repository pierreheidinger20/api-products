import { ConsoleLogger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  AllExceptionsFilter,
  LoggingInterceptor,
  ResponseInterceptor,
} from 'common-features';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const consoleLogger = app.get(ConsoleLogger);
  app.useGlobalFilters(new AllExceptionsFilter(consoleLogger));
  app.useGlobalInterceptors(new LoggingInterceptor(consoleLogger));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
