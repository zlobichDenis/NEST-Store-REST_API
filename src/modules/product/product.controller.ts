import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Patch,
	Delete,
	HttpCode,
	NotFoundException,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';

import { Product } from './schemas/product.schema';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { errorMessages } from './constants';
import {JwtAuthGuard} from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
	constructor(
		private productService: ProductService,
	) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const product = this.productService.findById(id);

		if (!product) {
			throw new NotFoundException(errorMessages.notFound);
		}

		return product;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedProduct = this.productService.delete(id);

		if (!deletedProduct) {
			throw new NotFoundException(errorMessages.notFound);
		}

		return deletedProduct;
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: Product) {
		const updatedProduct = this.productService.updateById(id, dto);

		if (!updatedProduct) {
			throw new NotFoundException(errorMessages.notFound);
		}

		return updatedProduct;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
