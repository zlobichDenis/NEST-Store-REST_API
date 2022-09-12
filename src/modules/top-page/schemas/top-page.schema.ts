import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { TopLevelCategory } from '../../../shared/types';

export type TopPageDocument = TopPage & Document;

@Schema()
export class TopPage {

	@Prop()
	fistCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop()
	advantages: {
		title: string;
		description: string;
	}[];

	@Prop()
	seoText: string;

	@Prop()
	tags: string[];

	@Prop()
	tagsTitle: string;

	@Prop()
	hh?: {
		count: number;
		juniorSalary: number;
		middleSalary: number;
		seniorSalary: number;
	};
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
