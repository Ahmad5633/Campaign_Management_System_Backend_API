import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async uploadFile(userId: string, file: Express.Multer.File): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fileId = new mongoose.Types.ObjectId().toHexString();

    const fileDetails = {
      fileId,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    };

    user.files = user.files || [];
    user.files.push(fileDetails);

    await user.save();

    return {
      id: fileId,
      filename: fileDetails.filename,
      originalname: fileDetails.originalname,
      mimetype: fileDetails.mimetype,
      size: fileDetails.size,
    };
  }

  async getFileById(userId: string, fileId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const file = user.files.find((file) => file.fileId === fileId);
    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }
}
