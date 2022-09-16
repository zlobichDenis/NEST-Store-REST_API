import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { TopPageModule } from './modules/top-page/top-page.module';
import { ProductModule } from './modules/product/product.module';
import { ReviewModule } from './modules/review/review.module';
import { getMongoConfig } from './config/mongo.config';
import { FilesModule } from './modules/files/files.module';
import { TelegrafModule } from './modules/telegraf/telegraf.module';

@Module({
  imports: [
	AuthModule,
	TopPageModule,
	ProductModule,
	ReviewModule,
	ConfigModule.forRoot({
		envFilePath: ['.env.dev.local']
	}),
	MongooseModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: getMongoConfig
	}),
	FilesModule,
	TelegrafModule,
  ],
})
export class AppModule {}
