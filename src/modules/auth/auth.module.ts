import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { User, AuthSchema } from './schemas/auth.schema';
import { AuthService } from './auth.service';
import { getJWTConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
      MongooseModule.forFeature(
          [
              {
                  name: User.name,
                  schema: AuthSchema,
              },
          ],
      ),
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getJWTConfig,
      }),
      ConfigModule,
      PassportModule,
  ],

  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
