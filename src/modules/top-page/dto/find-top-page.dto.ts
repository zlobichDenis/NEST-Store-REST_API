import {  IsEnum } from 'class-validator';

import { TopLevelCategory } from '../../../shared/types';

export class FindTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;
}