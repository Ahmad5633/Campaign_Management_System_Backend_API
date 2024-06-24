import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { Campaign, CampaignDocument } from './campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Campaign' })
  @ApiBody({ type: CreateCampaignDto })
  @ApiResponse({
    status: 201,
    description: 'Campaign created successfully',
    schema: {
      example: {
        message: 'Campaign created successfully',
        shareableLink: 'http://example.com/campaign/123',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
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
  @ApiOperation({ summary: 'Retrieve all Campaigns' })
  @ApiResponse({ status: 200, description: 'List of all campaigns' })
  async findAll() {
    return await this.campaignService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a Campaign by its share link' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The share link of the campaign',
  })
  @ApiResponse({ status: 200, description: 'Campaign retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async findByShareLink(@Param('id') id: string): Promise<Campaign> {
    return await this.campaignService.findByShareLink(id);
  }
}
