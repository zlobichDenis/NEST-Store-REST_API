import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

const getMongoURI = (configService: ConfigService) => {
	return 'mongodb+srv://' +
		configService.get('MONGO_LOGIN') + ':' +
		configService.get('MONGO_PASSWORD') +
		'@' + configService.get('MONGO_NAME') +
		'.yohiase.mongodb.net/?retryWrites=true&w=majority';
};

const getConfigOptions = () => {
	return {
		useUnifiedTopology: true,
	};
};

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
	return {
		uri: getMongoURI(configService),
		...getConfigOptions(),
	};
};