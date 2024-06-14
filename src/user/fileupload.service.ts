import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async uploadFile(userId: string, file: Express.Multer.File): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.filename = file.filename;
    user.originalname = file.originalname;
    user.mimetype = file.mimetype;
    user.size = file.size;
    user.buffer = file.buffer;
    return user.save();
  }
}
