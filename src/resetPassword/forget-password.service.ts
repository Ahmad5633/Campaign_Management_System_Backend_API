import { Injectable } from '@nestjs/common';
import { EmailService } from './send-email.service';
@Injectable()
export class ForgetPasswordService {
    public otpMap: Map<string, string> = new Map();

    constructor(private readonly emailService: EmailService) {}

    async sendOtp(email: string, otp: string): Promise<void> {
        await this.emailService.sendEmail(email, `Your OTP is: ${otp}`);
    }

    generateOtp(): string {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }

    storeOtp(email: string, otp: string): void {
        this.otpMap.set(email, otp);
    }

    async retrieveOtp(email: string): Promise<string | undefined> {
        return await this.otpMap.get(email);
    }
}
