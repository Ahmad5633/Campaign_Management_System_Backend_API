import { Module } from '@nestjs/common';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { UpdatePasswordService } from './update-password.service';
import { EmailService } from './send-email.service';
import { UserModule } from '../user/user.module'; 

@Module({
    imports: [UserModule], 
    controllers: [ForgetPasswordController],
    providers: [ForgetPasswordService, EmailService,UpdatePasswordService],
})
export class ForgetPasswordModule {}




