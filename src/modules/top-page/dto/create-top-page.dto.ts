import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { TopLevelCategory } from '../../../shared/types';

class HhData {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

class TopPageAdvantage {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@ValidateNested()
	@Type(() => TopPageAdvantage)
	advantages: TopPageAdvantage;

	@IsString()
	seoText: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsString()
	tagsTitle: string;

	@ValidateNested()
	hh?: HhData;
}