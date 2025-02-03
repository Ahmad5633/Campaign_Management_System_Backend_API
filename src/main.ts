// import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { AppModule } from './app.module';
// import { join } from 'path';
// import { NestExpressApplication } from '@nestjs/platform-express';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const app1 = await NestFactory.create<NestExpressApplication>(AppModule);
//   if (process.env.NODE_ENV === 'production') {
//     app.enableCors();
//   }

//   app1.useStaticAssets(
//     join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
//   );

//   const config = new DocumentBuilder()
//     .setTitle('Campaign Management System')
//     .setDescription('This website is used for Advertisement Purposes')
//     .setVersion('1.0')
//     .addTag('APIs of the Campaign Management System')
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   await app.listen(process.env.PORT || 3000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS in production environment
  if (process.env.NODE_ENV === 'production') {
    app.enableCors();
  }

  // Serve static Swagger UI files
  app.useStaticAssets(join(__dirname, '..', 'node_modules', 'swagger-ui-dist'));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Campaign Management System')
    .setDescription('This website is used for Advertisement Purposes')
    .setVersion('1.0')
    .addTag('APIs of the Campaign Management System')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the NestJS application
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
