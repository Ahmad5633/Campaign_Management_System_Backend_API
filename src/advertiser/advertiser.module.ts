import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertiserService } from './advertiser.service';
import { AdvertiserController } from './advertiser.controller';
import { Advertiser, AdvertiserSchema } from './advertiser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Advertiser.name, schema: AdvertiserSchema }]),
  ],
  controllers: [AdvertiserController],
  providers: [AdvertiserService],
})
export class AdvertiserModule {}
