import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileUploadService } from './fileupload.service';
import { FileDownloadService } from './fileDownload.service';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
import { RolesGuard } from '../roleBasedAuth/roles.guard';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from './user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: FileUploadService,
    private readonly downloadService: FileDownloadService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new User' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post(':userId/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file for a user' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'File uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid file.' })
  async uploadFile(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this.uploadService.uploadFile(userId, file);
  }

  @Get(':userId/download')
  @ApiOperation({ summary: 'Download a file for a user' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'File downloaded successfully.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
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

  @Get('advertisers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all advertisers' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Advertisers retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllAdvertisers(): Promise<User[]> {
    return this.userService.findAllAdvertisers();
  }

  @Get('publishers')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all publishers' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Publishers retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllPublishers(): Promise<User[]> {
    return this.userService.findAllPublishers();
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get a user by Id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getById(@Param('userId') userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }
}
