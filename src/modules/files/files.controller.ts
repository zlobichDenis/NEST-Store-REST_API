import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileResponseElement } from './dto/file-response-element.response';
import { MFile } from './mfile.class';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
	constructor(
		private readonly filesService: FilesService
	) {}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileResponseElement[]> {
		const files: MFile[] = [file];

		if (file.mimetype.includes('image')) {
			const webPBuffer = await this.filesService.convertToWebP(file.buffer);
			files.push(new MFile({
				originalname: `${file.originalname.split('.')[0]}.webp`,
				buffer: webPBuffer,
			}));
		}

		return this.filesService.saveFiles(files);
	}
}
