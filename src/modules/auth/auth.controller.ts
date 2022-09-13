import {
	Controller,
	Post,
	HttpCode,
	Body,
	UsePipes,
	ValidationPipe,
	BadRequestException,
} from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService
	) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	//TODO refactor: rewrite the createUser method so that it checks if there is such a user and the controller calls only one method
	async register(@Body() dto: AuthDto) {
		const user = await this.authService.findUserByEmail(dto.login);

		if (user) {
			throw new BadRequestException();
		}

		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const user = await this.authService.validateUser(dto);

		return this.authService.login(user.email);
	}
}
