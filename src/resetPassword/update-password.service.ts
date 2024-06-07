import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ForgetPasswordService } from './forget-password.service';
@Injectable()
export class UpdatePasswordService {
    constructor(
        private readonly userService: UserService,
        private readonly forgetPasswordService: ForgetPasswordService,
    ) {}

    async updatePassword(email: string, otp: string, newPassword: string): Promise<void> {
        const isValidOTP = await this.validateOTP(email, otp);
        
        if (!isValidOTP) {
            throw new BadRequestException('Invalid OTP');
        }

        await this.userService.updatePasswordByEmail(email, newPassword); 
    }

    async retrieveOtp(email: string): Promise<string | undefined> {
        return this.forgetPasswordService.retrieveOtp(email); 
    }

    private async validateOTP(email: string, otp: string): Promise<boolean> {
        try {
            const storedOTP: string | undefined = await this.forgetPasswordService.retrieveOtp(email);
            if (storedOTP === undefined) {
                throw new Error('OTP not found');
            }
            return otp === storedOTP;
        } catch (error) {
            console.error('Error retrieving OTP:', error);
            return false;
        }
    }
}
