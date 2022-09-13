import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { genSaltSync, hashSync, compare } from 'bcryptjs';

import { User, userDocument } from './schemas/auth.schema';
import { AuthDto } from './dto/auth.dto';
import { errorMessages } from "./constants";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<userDocument>,
        private jwtService: JwtService,
    ) {}

    async createUser(dto: AuthDto) {
        const newUser = new this.userModel({
            email: dto.login,
            passwordHash: hashSync(dto.password, genSaltSync(10)),
        });

        return newUser.save();
    }

    async findUserByEmail(email: string) {
        const user = this.userModel.findOne({ email });

         if (!user) {
             throw new BadRequestException(errorMessages.badRequest);
         }

         return user;
    }

    async validateUser(dto: AuthDto) {
        const user = await this.findUserByEmail(dto.login);

        if (!user) {
            return;
        }

        const isCorrectPassword = await compare(dto.password, user.passwordHash);

        if (!isCorrectPassword) {
            throw new UnauthorizedException(errorMessages.unauthorized);
        }

        return user;
    }

    async login(email: string) {
        const payload = { email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
