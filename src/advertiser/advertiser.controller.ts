import {
  Controller,
  Post,
  Body,
  Get,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Delete,
  Param,
  Patch,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { Advertiser } from './advertiser.schema';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
import { RolesGuard } from '../roleBasedAuth/roles.guard';
import { bucket } from '../firebaseIntegration/firebase.config';
import { extname } from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Advertisers')
@Controller('advertisers')
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Advertiser' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateAdvertiserDto,
    description: 'Create Advertiser',
  })
  @ApiResponse({ status: 201, description: 'Advertiser created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'dropFileHere', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createAdvertiserDto: CreateAdvertiserDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      dropFileHere?: Express.Multer.File[];
    },
  ): Promise<Advertiser> {
    try {
      if (files.logo && files.logo[0]) {
        const logoUrl = await this.uploadFileToFirebase(
          files.logo[0],
          'advertiser/logo',
        );
        createAdvertiserDto.logo = logoUrl;
      }

      if (files.dropFileHere && files.dropFileHere[0]) {
        const dropFileUrl = await this.uploadFileToFirebase(
          files.dropFileHere[0],
          'advertiser/dropfiles',
        );
        createAdvertiserDto.dropFileHere = dropFileUrl;
      }

      return await this.advertiserService.create(createAdvertiserDto);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create advertiser: ${error.message}`,
      );
    }
  }

  private async uploadFileToFirebase(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const destination = `${folder}/${uniqueSuffix}${extname(file.originalname)}`;

    await bucket.file(destination).save(file.buffer, {
      contentType: file.mimetype,
    });

    const [url] = await bucket.file(destination).getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    return url;
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Advertisers' })
  @ApiResponse({ status: 200, description: 'List of all advertisers.' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort_by') sortBy: string = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ): Promise<Advertiser[]> {
    return await this.advertiserService.findAll(page, limit, sortBy, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve Advertiser By Id' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the advertiser to find',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Get advertiser by Id.' })
  async findById(@Param('id') id: string): Promise<Advertiser> {
    return await this.advertiserService.findById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete an Advertiser by its ID (admin only)' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the advertiser to delete',
    required: true,
  })
  @ApiResponse({ status: 204, description: 'Advertiser deleted successfully' })
  @ApiResponse({ status: 404, description: 'Advertiser not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Only admin can delete this Advertiser',
  })
  async deleteAdvertiser(@Param('id') id: string): Promise<string> {
    return await this.advertiserService.deleteAdvertiser(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update an Advertiser by ID' })
  @ApiResponse({ status: 200, description: 'Advertiser updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async partialUpdate(
    @Param('id') id: string,
    @Body() updateAdvertiserDto: CreateAdvertiserDto,
  ): Promise<Advertiser> {
    return await this.advertiserService.partialUpdate(id, updateAdvertiserDto);
  }
}
