import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { UpdatePasswordService } from './update-password.service';
import { UserService } from '../user/user.service';

@Controller('password')
export class ForgetPasswordController {
  constructor(
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly updatePasswordService: UpdatePasswordService,
    private readonly userService: UserService,
  ) {}

  @Post('forget')
  async sendOtp(@Body() body: { email: string }): Promise<string> {
    const { email } = body;
    const isValidUser = await this.userService.isValidUser(email);
    if (!isValidUser) {
      throw new HttpException('Invalid email address', HttpStatus.BAD_REQUEST);
    }
    const otp = this.forgetPasswordService.generateOtp();
    this.forgetPasswordService.storeOtp(body.email, otp);

    try {
      const retrievedOtp = await this.forgetPasswordService.retrieveOtp(
        body.email,
      );
      if (retrievedOtp) {
        console.log('Retrieved OTP:', retrievedOtp);
      } else {
        console.log('No OTP found for the provided email.');
      }

      await this.forgetPasswordService.sendOtp(body.email, otp);
      return 'OTP sent successfully';
    } catch (error) {
      throw new HttpException(
        'Failed to send OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('update')
  async updatePassword(
    @Body()
    {
      email,
      otp,
      newPassword,
    }: {
      email: string;
      otp: string;
      newPassword: string;
    },
  ): Promise<string> {
    await this.updatePasswordService.updatePassword(email, otp, newPassword);
    return 'Password has been updated successfully...';
  }
}
