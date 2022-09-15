import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';

import { TopPage } from './schemas/top-page.schema';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UsePipes(new ValidationPipe())
@UseGuards(JwtAuthGuard)
@Controller('top-page')
export class TopPageController {
	constructor(
		private readonly topPageService: TopPageService,
	) {}

	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		return this.topPageService.findById(id);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.topPageService.delete(id);
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: TopPage) {
		return this.topPageService.updateById(id, dto);
	}

	@HttpCode(200)
	@Post()
	async findByCategory(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto);
	}

	@Get('search/:text')
	async search(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}
}
