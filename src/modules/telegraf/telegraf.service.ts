import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

import { TelegramOptions } from './interfaces/telegram.interface';
import { getTelegramConfig } from '../../config/telegram.config';

@Injectable()
export class TelegrafService {
	bot: Telegraf;
	options: TelegramOptions;

	constructor() {
		this.options = getTelegramConfig();
		this.bot = new Telegraf(this.options.token);
	}

	async sendMessage(message: string, chatId: string = this.options.chatId) {
		this.bot.telegram.sendMessage(chatId, message);
	}
}
