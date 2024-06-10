import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ForgetPasswordModule } from './resetPassword/forget-password.module';
import { LoginAuthModule } from './login/auth.module';
import { GoogleAuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/compaign-management-db'),
    UserModule,
    ForgetPasswordModule,
    LoginAuthModule,
    GoogleAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
