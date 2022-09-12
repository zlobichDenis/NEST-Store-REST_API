import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    ) {}

    async create(dto: CreateReviewDto): Promise<ReviewDocument> {
       return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<ReviewDocument | null> {
        return this.reviewModel.findByIdAndDelete(id);
    }

    async findByProductId(id: string): Promise<ReviewDocument[]> {
        return this.reviewModel.find({ productId: id });
    }

    async deleteByProductId(id: string) {
        return this.reviewModel.deleteMany({ productId: id });
    }
}
