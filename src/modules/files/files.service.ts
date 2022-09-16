import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

import { FileResponseElement } from './dto/file-response-element.response';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {

	async saveFiles(files: MFile[]): Promise<FileResponseElement[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/upload/${dateFolder}`;

		await ensureDir(uploadFolder);

		const response: FileResponseElement[] = [];

		await files.forEach((file) => {
			writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			response.push({ url: `${dateFolder}-${file.originalname}`, name: file.originalname });
		});

		return response;
	}

	async convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file)
			.webp()
			.toBuffer();
	}
}
