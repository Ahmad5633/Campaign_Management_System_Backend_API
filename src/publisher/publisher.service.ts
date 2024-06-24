import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publisher, PublisherDocument } from './publisher.schema';
import { CreatePublisherDto } from './dto/create-publisher.dto';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel(Publisher.name)
    private publisherModel: Model<PublisherDocument>,
  ) {}

  async create(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    const createdPublisher = new this.publisherModel({
      ...createPublisherDto,
    });
    return createdPublisher.save();
  }

  async findAll(): Promise<Publisher[]> {
    return this.publisherModel.find().exec();
  }

  async deletePublisher(id: string): Promise<string> {
    const deletedPlacement = await this.publisherModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedPlacement) {
      throw new NotFoundException('Placement not found');
    }

    return `Placement with ID ${id} has been successfully deleted`;
  }

  async partialUpdate(
    id: string,
    updateDto: CreatePublisherDto,
  ): Promise<Publisher> {
    const updatedPublisher = await this.publisherModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true, runValidators: true },
    );

    if (!updatedPublisher) {
      throw new NotFoundException(`Advertiser with ID ${id} not found`);
    }

    return updatedPublisher;
  }
}
