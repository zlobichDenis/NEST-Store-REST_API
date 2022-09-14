import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

import { CreateReviewDto } from '../dto/create-review.dto';

@Injectable()
export class CreateReviewPipe implements PipeTransform {
	async transform(value: CreateReviewDto, metadata: ArgumentMetadata) {
		return { ...value, productId: new Types.ObjectId(value.productId) };
	}
}