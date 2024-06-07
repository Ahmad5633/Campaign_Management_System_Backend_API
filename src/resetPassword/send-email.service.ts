import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ahmadhameed5633@gmail.com',
                pass: 'eevi dfho uzbe vqjv'
            }
        });
    }

    async sendEmail(email: string, otp: string): Promise<void> {
        const mailOptions = {
            from: 'ahmadhameed5633@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Your password reset token is: ${otp}. This token will expire in 5 mins.`
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Reset token email sent successfully');
        } catch (error) {
            console.error('Error sending reset token email:', error);
            throw error;
        }
    }
}
