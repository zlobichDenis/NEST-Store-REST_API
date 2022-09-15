import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { TopLevelCategory } from '../../../shared/types';

export type TopPageDocument = TopPage & Document;

export class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

@Schema({ timestamps: true })
export class TopPage {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop({ index: 'text' })
	title: string;

	@Prop({ index: 'text' })
	category: string;

	@Prop({ type: TopPageAdvantage })
	advantages: TopPageAdvantage;

	@Prop({ index: 'text' })
	seoText: string;

	@Prop([String, { _id: false }])
	tags: string[];

	@Prop({ index: 'text' })
	tagsTitle: string;

	@Prop()
	hh?: HhData;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
