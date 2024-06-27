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
    description: 'Create Advertiser',
    type: CreateAdvertiserDto,
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
    if (files.logo && files.logo[0]) {
      const logo = files.logo[0];
      const logoUrl = await this.uploadFileToFirebase(logo, 'advertiser/logo');
      createAdvertiserDto.logo = logoUrl; // Assign the URL directly to DTO property
    }

    if (files.dropFileHere && files.dropFileHere[0]) {
      const dropFile = files.dropFileHere[0];
      const dropFileUrl = await this.uploadFileToFirebase(
        dropFile,
        'advertiser/dropfiles',
      );
      createAdvertiserDto.dropFileHere = dropFileUrl; // Assign the URL directly to DTO property
    }

    return this.advertiserService.create(createAdvertiserDto);
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
    return this.advertiserService.findAll(page, limit, sortBy, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve Advertiser By Id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the advertiser to find',
  })
  @ApiResponse({ status: 200, description: 'Get advertiser by Id.' })
  async findById(@Param('id') id: string) {
    return this.advertiserService.findById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete an Advertiser by its ID (admin only)' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the advertiser to delete',
  })
  @ApiResponse({ status: 204, description: 'Advertiser deleted successfully' })
  @ApiResponse({ status: 404, description: 'Advertiser not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Only admin can delete this Advertiser',
  })
  async deleteAdvertiser(@Param('id') id: string): Promise<string> {
    const message = await this.advertiserService.deleteAdvertiser(id);
    return message;
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
    return this.advertiserService.partialUpdate(id, updateAdvertiserDto);
  }
}
