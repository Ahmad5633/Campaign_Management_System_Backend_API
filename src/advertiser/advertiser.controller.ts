import { Controller, Post, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { Advertiser } from './advertiser.schema';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('advertisers')
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'dropFileHere', maxCount: 1 }
  ], {
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
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
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
  }),
)

  async create(
    @Body() createAdvertiserDto: CreateAdvertiserDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Advertiser> {
    return this.advertiserService.create(createAdvertiserDto);
  }
}
