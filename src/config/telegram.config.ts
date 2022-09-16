import { TelegramOptions } from '../modules/telegraf/interfaces/telegram.interface';

export const getTelegramConfig = (): TelegramOptions => {
	return {
		token: '',
		chatId: '',
	};
};