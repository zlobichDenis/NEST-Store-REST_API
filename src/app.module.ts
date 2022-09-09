import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TopPageModule } from './modules/top-page/top-page.module';
import { ProductModule } from './modules/product/product.module';
import { ReviewModule } from './modules/review/review.module';
import { getMongoConfig } from './config/mongo.config';

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
	})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
