import {
	Body,
	Controller,
	Post,
	Param,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { errorMessages } from './constants';

@Controller('review')
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDocument = this.reviewService.delete(id);

		if (!deletedDocument) {
			throw new HttpException(errorMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}
}
