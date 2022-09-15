import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewService } from './review.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
      MongooseModule.forFeature([
          {
            name: Review.name,
            schema: ReviewSchema,
          },
      ]),
      ProductModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
