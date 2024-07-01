import { Injectable } from '@nestjs/common';
import { bucket } from '../firebaseIntegration/firebase.config';
import { extname } from 'path';

@Injectable()
export class FileUploadService {
  async uploadFiles(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    const uploadedFilePaths: string[] = [];

    if (files && files.length > 0) {
      await Promise.all(
        files.map(async (file) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const destination = `${folder}/${uniqueSuffix}${extname(file.originalname)}`;

          try {
            await bucket.file(destination).save(file.buffer);
            uploadedFilePaths.push(destination);
          } catch (error) {
            console.error('Error uploading to Firebase:', error);
            throw new Error('Failed to upload file to Firebase');
          }
        }),
      );
    }

    return uploadedFilePaths;
  }
}
