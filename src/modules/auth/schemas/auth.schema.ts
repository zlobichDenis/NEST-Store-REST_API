import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
	@Prop()
	email: string;

	@Prop()
	passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
