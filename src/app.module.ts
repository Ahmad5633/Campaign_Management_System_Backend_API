import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ForgetPasswordModule } from './resetPassword/forget-password.module';
import { AuthModule } from './roleBasedAuth/auth.module';
import { GoogleAuthModule } from './auth/auth.module';
import { AdvertiserModule } from './advertiser/advertiser.module';
import { PublisherModule } from './publisher/publisher.module';
import { CampaignModule } from './campaign/campaign.module';
import { PlacementModule } from './placement/placement.module';
import { ComplaintsModule } from './complain/complaints.module';
import { PaymentModule } from './payment/payment.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    ForgetPasswordModule,
    AuthModule,
    GoogleAuthModule,
    AdvertiserModule,
    PublisherModule,
    CampaignModule,
    PlacementModule,
    ComplaintsModule,
    PaymentModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
