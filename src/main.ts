import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonModule } from './common/common.module';
import { ConfigService } from './common/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.select(CommonModule).get(ConfigService, { strict: true });

  await app.listen(config.get('PORT'));
}

bootstrap();
