import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

@Schema({ timestamps: true })
export class Product {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()

	@Prop()
	calculatedRating: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop([String])
	categories: string[];

	@Prop([String, { _id: false }])
	tags: string[];

	@Prop([ProductCharacteristic])
	characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
