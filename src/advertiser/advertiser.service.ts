import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Advertiser, AdvertiserDocument } from './advertiser.schema';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';

@Injectable()
export class AdvertiserService {
  constructor(
    @InjectModel(Advertiser.name)
    private advertiserModel: Model<AdvertiserDocument>,
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto): Promise<Advertiser> {
    const createdAdvertiser = new this.advertiserModel({
      ...createAdvertiserDto,
    });
    return createdAdvertiser.save();
  }

  async findAll(): Promise<Advertiser[]> {
    return this.advertiserModel.find().exec();
  }

  async deleteAdvertiser(id: string): Promise<string> {
    const deletedPlacement = await this.advertiserModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedPlacement) {
      throw new NotFoundException('Placement not found');
    }

    return `Placement with ID ${id} has been successfully deleted`;
  }
}
