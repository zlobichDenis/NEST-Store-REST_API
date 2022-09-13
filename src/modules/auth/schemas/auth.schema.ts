import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = User & Document;

@Schema({ timestamps: true })
export class User {
	@Prop({ unique: true })
	email: string;

	@Prop()
	passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(User);
