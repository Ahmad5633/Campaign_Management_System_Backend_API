import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { Campaign, CampaignDocument } from './campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async createCampaign(
    @Body() createCampaignDto: CreateCampaignDto,
  ): Promise<{ message: string; shareableLink: string }> {
    const campaign: CampaignDocument =
      await this.campaignService.createCampaign(createCampaignDto);
    return {
      message: 'Campaign created successfully',
      shareableLink: campaign.shareLink,
    };
  }

  @Get()
  async findAll() {
    return await this.campaignService.findAll();
  }

  @Get(':id')
  async findByShareLink(@Param('id') id: string): Promise<Campaign> {
    return await this.campaignService.findByShareLink(id);
  }
}
