import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { Publisher, PublisherSchema } from './publisher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Publisher.name, schema: PublisherSchema }]),
  ],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}
