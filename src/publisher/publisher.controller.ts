import {
  Controller,
  Post,
  Body,
  Get,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from './publisher.schema';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

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
}
