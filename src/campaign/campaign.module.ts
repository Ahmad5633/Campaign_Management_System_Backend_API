import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { Campaign, CampaignSchema } from './campaign.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  providers: [CampaignService],
  controllers: [CampaignController],
})
export class CampaignModule {}
