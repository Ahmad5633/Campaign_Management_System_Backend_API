import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileUploadService } from './fileupload.service';
import { FileDownloadService } from './fileDownload.service';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: FileUploadService,
    private readonly downloadService: FileDownloadService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new User' })
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Post(':userId/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this.uploadService.uploadFile(userId, file);
  }

  @Get(':userId/download')
  async downloadFile(
    @Param('userId') userId: string,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.downloadService.downloadFile(userId);
    if (!file) {
      res.status(404).send('File not found');
      return;
    }
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Length', file.size);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${file.filename}`,
    );
    res.send(file.buffer);
  }
}
