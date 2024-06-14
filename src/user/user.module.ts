import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { ConfigModule } from '@nestjs/config';
import { FileUploadService } from './fileupload.service';
import { FileDownloadService } from './fileDownload.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, FileUploadService, FileDownloadService],
  exports: [UserService],
})
export class UserModule {}
