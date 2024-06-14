import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class FileDownloadService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async downloadFile(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user || !user.buffer) {
      throw new NotFoundException('File not found');
    }
    return user;
  }
}
