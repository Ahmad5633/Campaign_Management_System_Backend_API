import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MediaManagement,
  MediaManagementDocument,
} from './mediaManagement.schema';

@Injectable()
export class MediaManagementService {
  constructor(
    @InjectModel(MediaManagement.name)
    private mediaManagementModel: Model<MediaManagementDocument>,
  ) {}

  async create(createMediaDto: MediaManagement): Promise<MediaManagement> {
    const createdMedia = new this.mediaManagementModel(createMediaDto);
    return createdMedia.save();
  }

  async findAll(): Promise<MediaManagement[]> {
    return this.mediaManagementModel.find().exec();
  }

  async findOne(id: string): Promise<MediaManagement> {
    return this.mediaManagementModel.findById(id).exec();
  }

  async update(
    id: string,
    updateMediaDto: MediaManagement,
  ): Promise<MediaManagement> {
    return this.mediaManagementModel
      .findByIdAndUpdate(id, updateMediaDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<MediaManagement> {
    return this.mediaManagementModel.findByIdAndDelete(id).exec();
  }
}
