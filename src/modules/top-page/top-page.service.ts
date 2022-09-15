import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TopPage, TopPageDocument } from './schemas/top-page.schema';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { errorMessages } from './constants';
import { FindTopPageDto } from './dto/find-top-page.dto';


@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPage.name) private readonly topPageModule: Model<TopPageDocument>,
	) {}

	async create(dto: CreateTopPageDto) {
		const isExist = await this.topPageModule.findOne({ alias: dto.alias });

		if (isExist) {
			throw new BadRequestException(errorMessages.alreadyExist);
		}

		return this.topPageModule.create(dto);
	}

	async findById(id: string) {
		const page = this.topPageModule.findById(id);

		if (!page) {
			throw new NotFoundException(errorMessages.notFound);
		}

		return page;
	}

	async findByCategory(dto: FindTopPageDto) {
		return this.topPageModule
			.aggregate([
				{
					$match: {
						firstCategory: dto.firstCategory,
					},
				},
			])
			.group({
				_id: {
					secondCategory: '$secondCategory',
				},
				pages: {
					$push: {
						alias: '$alias',
						title: '$title',
					},
				},
			});
	}

	async findByText(text: string) {
		return this.topPageModule.find(
			{
				$text: {
					$search: text,
					$caseSensitive: false,
				}
			}
			);
	}

	async delete(id: string) {
		return this.topPageModule.findByIdAndDelete(id);
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModule.findByIdAndUpdate(id, dto, { new: true });
	}
}
