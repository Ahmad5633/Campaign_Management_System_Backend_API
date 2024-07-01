import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { Campaign, CampaignSchema } from './campaign.schema';
import { FileUploadService } from '../fileupload/fileupload.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  providers: [CampaignService, FileUploadService],
  controllers: [CampaignController],
})
export class CampaignModule {}
