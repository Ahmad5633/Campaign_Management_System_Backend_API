import { Injectable } from '@nestjs/common';
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
}
