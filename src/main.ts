import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app/modules/main/app.module';
import { loggerOptions } from './utils/logger.util';
import { Logger, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(
      loggerOptions(process.env.APPLICATION_NAME || 'app'),
    ),
  });
  const configService = app.get(ConfigService);
  // const environment =
  //   configService.get<string>('NODE_ENV') || process.env.NODE_ENV;
  const port = configService.get<number>('PORT') || 7000;

  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');
  //let globalDocPrefix = `${globalPrefix}/docs`;

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
