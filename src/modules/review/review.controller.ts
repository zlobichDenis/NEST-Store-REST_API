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
	UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { errorMessages } from './constants';
import { CreateReviewPipe } from './pipes/create-review.pipe';

@UseGuards(JwtAuthGuard)
@Controller('review')
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body(new CreateReviewPipe()) dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDocument = this.reviewService.delete(id);

		if (!deletedDocument) {
			throw new HttpException(errorMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}
}
