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
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { Advertiser } from './advertiser.schema';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
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
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'dropFileHere', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            if (file.fieldname === 'logo') {
              cb(null, './uploads/advertiser/logos');
            } else if (file.fieldname === 'dropFileHere') {
              cb(null, './uploads/advertiser/dropfiles');
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
          if (file.fieldname === 'logo' || file.fieldname === 'dropFileHere') {
            cb(null, true);
          } else {
            cb(new Error('Unknown file field'), false);
          }
        },
      },
    ),
  )
  async create(
    @Body() createAdvertiserDto: CreateAdvertiserDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      dropFileHere?: Express.Multer.File[];
    },
  ): Promise<Advertiser> {
    return this.advertiserService.create(createAdvertiserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Advertisers' })
  @ApiResponse({ status: 200, description: 'List of all advertisers.' })
  async findAll() {
    return this.advertiserService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a Advertiser by its ID (admin only)' })
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
  @UseGuards(JwtAuthGuard)
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
