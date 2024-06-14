// import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { AppModule } from './app.module';
// import * as express from 'express';
// import * as path from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   if (process.env.NODE_ENV === 'production') {
//     app.enableCors();
//   }
//   const config = new DocumentBuilder()
//     .setTitle('Campaign Management System')
//     .setDescription('This website is used to for Advertisement Purposes')
//     .setVersion('1.0')
//     .addTag('APIs of the Compaign Management System')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   const publicDir = path.join(__dirname, '..', 'public');
//   app.use('/api-docs', express.static(publicDir));

//   await app.listen(process.env.PORT || 3000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'production') {
    app.enableCors();
  }

  const config = new DocumentBuilder()
    .setTitle('Campaign Management System')
    .setDescription('This website is used for Advertisement Purposes')
    .setVersion('1.0')
    .addTag('APIs of the Campaign Management System')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const publicDir = path.join(__dirname, '..', 'public');
  app.use('/api-docs', express.static(publicDir));

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
