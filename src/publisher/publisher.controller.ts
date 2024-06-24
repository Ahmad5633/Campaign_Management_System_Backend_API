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
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from './publisher.schema';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
import { RolesGuard } from '../roleBasedAuth/roles.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

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
    FileFieldsInterceptor(
      [
        { name: 'mediaKit', maxCount: 1 },
        { name: 'dropFileHere', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            if (file.fieldname === 'mediaKit') {
              cb(null, './uploads/publisher/mediakits');
            } else if (file.fieldname === 'dropFileHere') {
              cb(null, './uploads/publisher/dropfiles');
            } else {
              cb(new Error('Unknown file field'), null);
            }
          },
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
        fileFilter: (req, file, cb) => {
          if (
            file.fieldname === 'mediaKit' ||
            file.fieldname === 'dropFileHere'
          ) {
            cb(null, true);
          } else {
            cb(new Error('Unknown file field'), false);
          }
        },
      },
    ),
  )
  async create(
    @Body() createPublisherDto: CreatePublisherDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Publisher> {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all publishers' })
  @ApiResponse({ status: 200, description: 'List of all publishers' })
  async findAll() {
    return this.publisherService.findAll();
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
    description: 'Unauthorized: Only admin can delete this publiasher',
  })
  async deletePublisher(@Param('id') id: string): Promise<string> {
    const message = await this.publisherService.deletePublisher(id);
    return message;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update an Publisher by ID' })
  @ApiResponse({ status: 200, description: 'Publisher updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async partialUpdate(
    @Param('id') id: string,
    @Body() updatePublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    return this.publisherService.partialUpdate(id, updatePublisherDto);
  }
}
