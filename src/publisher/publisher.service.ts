import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publisher, PublisherDocument } from './publisher.schema';
import { CreatePublisherDto } from './dto/create-publisher.dto';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel(Publisher.name) private publisherModel: Model<PublisherDocument>,
  ) {}

  async create(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    const createdPublisher = new this.publisherModel({ 
      ...createPublisherDto
    });
    return createdPublisher.save();
  }

}
