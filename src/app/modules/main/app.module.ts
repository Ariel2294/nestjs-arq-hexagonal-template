import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { loggerOptions } from '../../../utils/logger.util';
import { ConfigurationService } from '../../../config/services/config-service.config';
import { ConfigurationServiceValidate } from '../../../config/services/config.validate';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: ConfigurationServiceValidate,
    }),
    WinstonModule.forRoot(loggerOptions(process.env.APPLICATION_NAME || 'app')),
  ],

  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule {}
