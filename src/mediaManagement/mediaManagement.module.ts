import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaManagementService } from './mediaManagement.service';
import { MediaManagementController } from './mediaManagement.controller';
import { FileUploadService } from '../fileupload/fileupload.service';
import {
  MediaManagement,
  MediaManagementSchema,
} from './mediaManagement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MediaManagement.name, schema: MediaManagementSchema },
    ]),
  ],
  controllers: [MediaManagementController],
  providers: [MediaManagementService, FileUploadService],
})
export class MediaManagementModule {}
