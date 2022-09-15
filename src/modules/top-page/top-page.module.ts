import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TopPageController } from './top-page.controller';
import { TopPage, TopPageSchema } from './schemas/top-page.schema';
import { TopPageService } from './top-page.service';

@Module({
  imports: [
      MongooseModule.forFeature([
          {
            name: TopPage.name,
            schema: TopPageSchema,
          }
      ]),
  ],
  controllers: [TopPageController],
  providers: [TopPageService]
})
export class TopPageModule {}
