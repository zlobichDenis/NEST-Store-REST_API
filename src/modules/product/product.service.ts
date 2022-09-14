import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

    async create(dto: CreateProductDto) {
        return this.productModel.create(dto);
    }

    async findById(id: string) {
        return this.productModel.findById(id);
    }

    async delete(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async findWithReviews(dto: FindProductDto) {
        return this.productModel
            .aggregate([
                {
                    $match: {
                        categories: dto.category,
                    },
                }
            ])
            .sort('_id')
            .limit(dto.limit)
            .lookup({
                from: 'reviews',
                localField: '_id',
                foreignField: 'productId',
                as: 'test',
            })
            .addFields({
                avg: { '$avg': '$test.rating' }
            })
    }
}
