import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([
		{
			name: Auth.name,
			schema: AuthSchema,
		},
  ])],
  providers: [AuthService]
})
export class AuthModule {}
