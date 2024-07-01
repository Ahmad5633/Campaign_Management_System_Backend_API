import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
import { RolesGuard } from '../roleBasedAuth/roles.guard';
import { FileUploadService } from '../fileupload/fileupload.service';
import { Campaign } from './campaign.schema';

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
  constructor(
    private readonly campaignService: CampaignService,
    private readonly fileUploadService: FileUploadService,
  ) {}

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
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async createCampaign(
    @Body() createCampaignDto: CreateCampaignDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ message: string; shareableLink: string }> {
    const uploadImages = await this.fileUploadService.uploadFiles(
      files,
      'campaigns/images',
    );
    createCampaignDto.image = uploadImages;
    const campaign =
      await this.campaignService.createCampaign(createCampaignDto);
    return {
      message: 'Campaign created successfully',
      shareableLink: campaign.shareLink,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Campaigns' })
  @ApiResponse({ status: 200, description: 'List of all campaigns' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort_by') sortBy: string = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ): Promise<Campaign[]> {
    return this.campaignService.findAll(page, limit, sortBy, order);
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a Campaign by its ID (admin only)' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the campaign to delete',
  })
  @ApiResponse({ status: 204, description: 'Campaign deleted successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Only admin can delete this campaign',
  })
  async deleteCampaign(@Param('id') id: string): Promise<void> {
    await this.campaignService.deleteCampaign(id);
  }
}
