// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { User, UserSchema } from './user.schema';
// import { ConfigModule } from '@nestjs/config';
// import { FileUploadService } from './fileupload.service';
// import { FileDownloadService } from './fileDownload.service';
// import { AuthModule } from '../roleBasedAuth/auth.module';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//     AuthModule,
//     JwtModule.register({
//       secret: 'secretKey', // Use a better secret key in production
//       signOptions: { expiresIn: '60m' },
//     }),
//     PassportModule,
//   ],
//   controllers: [UserController],
//   providers: [UserService, FileUploadService, FileDownloadService],
//   exports: [UserService],
// })
// export class UserModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { ConfigModule } from '@nestjs/config';
import { FileUploadService } from './fileupload.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, FileUploadService],
  exports: [UserService],
})
export class UserModule {}
