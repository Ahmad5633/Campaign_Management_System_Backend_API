import {
  Controller,
  Post,
  Body,
  Get,
  UploadedFiles,
  UseInterceptors,
  Delete,
  Param,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from './publisher.schema';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
import { RolesGuard } from '../roleBasedAuth/roles.guard';
import { bucket } from '../firebaseIntegration/firebase.config';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { extname } from 'path';

@ApiTags('Publishers')
@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new publisher' })
  @ApiBody({
    description: 'Details of the new publisher and files to upload',
    type: CreatePublisherDto,
  })
  @ApiResponse({ status: 201, description: 'Publisher created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mediaKit', maxCount: 1 },
      { name: 'dropFileHere', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createPublisherDto: CreatePublisherDto,
    @UploadedFiles()
    files: {
      mediaKit?: Express.Multer.File[];
      dropFileHere?: Express.Multer.File[];
    },
  ): Promise<Publisher> {
    try {
      const fileUploadPromises = [];

      if (files.mediaKit && files.mediaKit[0]) {
        const mediaKit = files.mediaKit[0];
        const mediaKitUploadPromise = this.uploadFileToFirebase(
          mediaKit,
          'publisher/mediakits',
        );
        fileUploadPromises.push(mediaKitUploadPromise);
      }

      if (files.dropFileHere && files.dropFileHere[0]) {
        const dropFile = files.dropFileHere[0];
        const dropFileUploadPromise = this.uploadFileToFirebase(
          dropFile,
          'publisher/dropfiles',
        );
        fileUploadPromises.push(dropFileUploadPromise);
      }

      const [mediaKitUrl, dropFileHereUrl] =
        await Promise.all(fileUploadPromises);

      createPublisherDto.mediaKit = mediaKitUrl;
      createPublisherDto.dropFileHere = dropFileHereUrl;

      return await this.publisherService.create(createPublisherDto);
    } catch (error) {
      // Handle errors, such as file upload failures
      throw new Error(`Failed to create publisher: ${error.message}`);
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
      metadata: {
        firebaseStorageDownloadTokens: uniqueSuffix,
      },
    });

    const fileRef = bucket.file(destination);
    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    return url;
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all publishers' })
  @ApiResponse({ status: 200, description: 'List of all publishers' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort_by') sortBy: string = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ): Promise<Publisher[]> {
    return await this.publisherService.findAll(page, limit, sortBy, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve Publisher By Id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the publisher to find',
  })
  @ApiResponse({ status: 200, description: 'Get publisher by Id.' })
  @ApiResponse({ status: 404, description: 'Publisher not found.' })
  async findById(@Param('id') id: string): Promise<Publisher> {
    return await this.publisherService.findById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a Publisher by its ID (admin only)' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the publisher to delete',
  })
  @ApiResponse({ status: 204, description: 'Publisher deleted successfully' })
  @ApiResponse({ status: 404, description: 'Publisher not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Only admin can delete this publisher',
  })
  async deletePublisher(@Param('id') id: string): Promise<string> {
    const message = await this.publisherService.deletePublisher(id);
    return message;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update a Publisher by ID' })
  @ApiResponse({ status: 200, description: 'Publisher updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async partialUpdate(
    @Param('id') id: string,
    @Body() updatePublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    return await this.publisherService.partialUpdate(id, updatePublisherDto);
  }
}
