// import { Controller, Post, Body } from '@nestjs/common';
// import { AdvertiserService } from './advertiser.service';
// import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
// import { Advertiser } from './advertiser.schema';

// @Controller('advertisers')
// export class AdvertiserController {
//   constructor(private readonly advertiserService: AdvertiserService) {}

//   @Post()
//   async create(@Body() createAdvertiserDto: CreateAdvertiserDto): Promise<Advertiser> {
//     return this.advertiserService.create(createAdvertiserDto);
//   }

// }


import {
    Controller,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
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
      FileInterceptor('logo', {
        storage: diskStorage({
          destination: './uploads', // Directory where the files will be saved
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async create(
      @Body() createAdvertiserDto: CreateAdvertiserDto,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Advertiser> {
      const filePath = file ? file.path : null;
      return this.advertiserService.create(createAdvertiserDto, filePath);
    }
  }
  