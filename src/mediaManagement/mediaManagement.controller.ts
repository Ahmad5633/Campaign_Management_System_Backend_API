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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MediaManagementService } from './mediaManagement.service';
import { MediaManagement } from './mediaManagement.schema';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
import { RolesGuard } from '../roleBasedAuth/roles.guard';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { FileUploadService } from '../fileupload/fileupload.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('media-management')
@Controller('media-management')
export class MediaManagementController {
  constructor(
    private readonly mediaManagementService: MediaManagementService,
    private readonly fileUploadService: FileUploadService,
  ) {}

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
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async createCampaign(
    @Body() createMediaDto: MediaManagement,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ message: string; data: MediaManagement }> {
    try {
      const uploadImages = await this.fileUploadService.uploadFiles(
        files,
        'mediaManagement/images',
      );
      createMediaDto.uploadImages = uploadImages;
      const newMedia = await this.mediaManagementService.create(createMediaDto);
      return {
        message: 'Media Management created successfully',
        data: newMedia,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create campaign',
        HttpStatus.BAD_REQUEST,
      );
    }
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
    try {
      return await this.mediaManagementService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to get media entries',
        HttpStatus.BAD_REQUEST,
      );
    }
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
    try {
      return await this.mediaManagementService.findOne(id);
    } catch (error) {
      throw new HttpException(
        'Failed to get media entry',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a media management entry by ID' })
  @ApiParam({ name: 'id', description: 'Media management entry ID' })
  async update(
    @Param('id') id: string,
    @Body() updateMediaDto: MediaManagement,
  ) {
    try {
      return await this.mediaManagementService.update(id, updateMediaDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update media entry',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a media management entry by ID' })
  @ApiParam({ name: 'id', description: 'Media management entry ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted.' })
  async delete(@Param('id') id: string) {
    try {
      return await this.mediaManagementService.delete(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete media entry',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
