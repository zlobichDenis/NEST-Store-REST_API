import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TelegrafService } from './telegraf.service';

@Module({
  imports: [ConfigModule],
  providers: [TelegrafService, ConfigService],
})
export class TelegrafModule {}
