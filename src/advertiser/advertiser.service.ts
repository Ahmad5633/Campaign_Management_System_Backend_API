import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
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

  async findAll(
    page: number,
    limit: number,
    sortBy: string,
    order: 'asc' | 'desc',
  ): Promise<Advertiser[]> {
    const offset = (page - 1) * limit;

    const sortQuery: { [key: string]: SortOrder } = {};
    sortQuery[sortBy] = order === 'asc' ? 'asc' : 'desc';

    return this.advertiserModel
      .find()
      .sort(sortQuery)
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<Advertiser> {
    return this.advertiserModel.findById(id).exec();
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

  async partialUpdate(
    id: string,
    updateDto: CreateAdvertiserDto,
  ): Promise<Advertiser> {
    const updatedAdvertiser = await this.advertiserModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true, runValidators: true },
    );

    if (!updatedAdvertiser) {
      throw new NotFoundException(`Advertiser with ID ${id} not found`);
    }

    return updatedAdvertiser;
  }
}
