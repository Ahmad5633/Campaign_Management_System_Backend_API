import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), PassportModule],
  controllers: [AuthController],
  providers: [GoogleStrategy],
})
export class GoogleAuthModule {}
