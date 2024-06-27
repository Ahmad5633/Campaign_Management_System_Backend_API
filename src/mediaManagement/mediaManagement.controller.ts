import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MediaManagementService } from './mediaManagement.service';
import { MediaManagement } from './mediaManagement.schema';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
import { RolesGuard } from '../roleBasedAuth/roles.guard';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import * as fs from 'fs';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { bucket } from '../firebaseIntegration/firebase.config';

@ApiTags('media-management')
@Controller('media-management')
export class MediaManagementController {
  constructor(private readonly mediaManagementService: MediaManagementService) {
    this.ensureUploadDirectoryExists();
  }

  private ensureUploadDirectoryExists() {
    const uploadPath = './uploads/mediaManagement/images';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Create a new media management entry' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        companyName: { type: 'string' },
        businessType: { type: 'string' },
        adTitle: { type: 'string' },
        adName: { type: 'string' },
        businessTag: { type: 'string' },
        region: { type: 'string' },
        description: { type: 'string' },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/mediaManagement/images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createMediaDto: MediaManagement,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const filePaths = files.map((file) => file.path);
    createMediaDto.uploadImages = filePaths;

    await Promise.all(
      files.map((file) =>
        this.uploadFileToFirebase(file).catch((error) => {
          console.error('Error uploading to Firebase:', error);
        }),
      ),
    );

    return this.mediaManagementService.create(createMediaDto);
  }

  async uploadFileToFirebase(file: Express.Multer.File): Promise<void> {
    const filePath = file.path;
    const destination = `mediaManagement/images/${file.filename}`;

    return new Promise((resolve, reject) => {
      bucket.upload(filePath, { destination }, (error, file) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all media management entries' })
  @ApiResponse({
    status: 200,
    description: 'Returns all media management entries.',
    type: MediaManagement,
    isArray: true,
  })
  async findAll() {
    return this.mediaManagementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a media management entry by ID' })
  @ApiParam({ name: 'id', description: 'Media management entry ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the media management entry.',
    type: MediaManagement,
  })
  async findOne(@Param('id') id: string) {
    return this.mediaManagementService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a media management entry by ID' })
  @ApiParam({ name: 'id', description: 'Media management entry ID' })
  async update(
    @Param('id') id: string,
    @Body() updateMediaDto: MediaManagement,
  ) {
    return this.mediaManagementService.update(id, updateMediaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a media management entry by ID' })
  @ApiParam({ name: 'id', description: 'Media management entry ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted.' })
  async delete(@Param('id') id: string) {
    return this.mediaManagementService.delete(id);
  }
}
