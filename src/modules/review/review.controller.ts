import { Body, Controller, Post, Param, Delete, Get } from '@nestjs/common';

import { Review } from './schemas/review.schema';

@Controller('review')
export class ReviewController {

	@Post('create')
	async create(@Body() dto: Review) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {

	}
}
