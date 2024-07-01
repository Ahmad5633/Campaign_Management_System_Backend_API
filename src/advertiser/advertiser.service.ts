import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    try {
      const createdAdvertiser = new this.advertiserModel(createAdvertiserDto);
      return await createdAdvertiser.save();
    } catch (error) {
      throw new BadRequestException(
        `Failed to create advertiser: ${error.message}`,
      );
    }
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

    try {
      return await this.advertiserModel
        .find()
        .sort(sortQuery)
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new NotFoundException('Advertisers not found');
    }
  }

  async findById(id: string): Promise<Advertiser> {
    try {
      const advertiser = await this.advertiserModel.findById(id).exec();
      if (!advertiser) {
        throw new NotFoundException(`Advertiser with ID ${id} not found`);
      }
      return advertiser;
    } catch (error) {
      throw new NotFoundException(`Advertiser with ID ${id} not found`);
    }
  }

  async deleteAdvertiser(id: string): Promise<string> {
    try {
      const deletedAdvertiser = await this.advertiserModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedAdvertiser) {
        throw new NotFoundException(`Advertiser with ID ${id} not found`);
      }
      return `Advertiser with ID ${id} has been successfully deleted`;
    } catch (error) {
      throw new NotFoundException(`Advertiser with ID ${id} not found`);
    }
  }

  async partialUpdate(
    id: string,
    updateDto: CreateAdvertiserDto,
  ): Promise<Advertiser> {
    try {
      const updatedAdvertiser = await this.advertiserModel
        .findByIdAndUpdate(
          id,
          { $set: updateDto },
          { new: true, runValidators: true },
        )
        .exec();

      if (!updatedAdvertiser) {
        throw new NotFoundException(`Advertiser with ID ${id} not found`);
      }

      return updatedAdvertiser;
    } catch (error) {
      throw new NotFoundException(`Advertiser with ID ${id} not found`);
    }
  }
}
