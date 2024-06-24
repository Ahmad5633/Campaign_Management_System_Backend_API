import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth2 login' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Google for authentication',
  })
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth2 callback' })
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
    schema: { example: { statusCode: 200, data: { user: {} } } },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async googleAuthRedirect(@Req() req) {
    return {
      statusCode: 200,
      data: req.user,
    };
  }
}
