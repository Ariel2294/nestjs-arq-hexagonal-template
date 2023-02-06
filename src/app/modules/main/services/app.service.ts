import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { createContextWinston } from '../../../../utils/logger.util';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  getHello(): string {
    const context = createContextWinston(
      this.constructor.name,
      this.getHello.name,
    );
    this.logger.info('Hello World!', { ...context });
    return 'Hello World!';
  }
}
