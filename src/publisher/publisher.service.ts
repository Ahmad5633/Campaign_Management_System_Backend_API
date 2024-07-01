import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publisher, PublisherDocument } from './publisher.schema';
import { CreatePublisherDto } from './dto/create-publisher.dto';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel(Publisher.name)
    private readonly publisherModel: Model<PublisherDocument>,
  ) {}

  async create(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    const createdPublisher = new this.publisherModel(createPublisherDto);
    return createdPublisher.save();
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: string = 'createdAt',
    order: 'asc' | 'desc' = 'asc',
  ): Promise<Publisher[]> {
    const offset = (page - 1) * limit;

    const sortQuery = { [sortBy]: order };

    return this.publisherModel
      .find()
      .sort(sortQuery)
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<Publisher> {
    const publisher = await this.publisherModel.findById(id).exec();
    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  async deletePublisher(id: string): Promise<string> {
    const deletedPublisher = await this.publisherModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedPublisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return `Publisher with ID ${id} has been successfully deleted`;
  }

  async partialUpdate(
    id: string,
    updateDto: CreatePublisherDto,
  ): Promise<Publisher> {
    const updatedPublisher = await this.publisherModel
      .findByIdAndUpdate(id, updateDto, { new: true, runValidators: true })
      .exec();

    if (!updatedPublisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }

    return updatedPublisher;
  }
}
