import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { Product, ProductDocument } from '../product/schemas/product.schema';
import { errorMessages } from './constants';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

    async create(dto: CreateReviewDto): Promise<ReviewDocument> {
        const product = await this.productModel.findById(dto.productId);

        if (!product) {
            throw new NotFoundException(errorMessages.NOT_FOUND);
        }

        const review = await this.reviewModel.create(dto);

        return review;
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
