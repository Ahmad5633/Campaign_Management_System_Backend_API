// import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { AppModule } from './app.module';
// import * as express from 'express';
// import * as path from 'path';
// import { normalize } from 'node:path/win32';

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
// // normalize
// //   const publicDir = path.join(__dirname, '..', 'public');
// //   app.use('/api-docs', express.static(publicDir));

// const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

// // Swagger setup
// const swaggerSpec = swaggerJSDoc(swaggerOptions)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//     customCss:
//         '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
//     customCssUrl: CSS_URL,
// }
// ))
//   await app.listen(process.env.PORT || 3000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
  SwaggerModule.setup('api', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    customCss: `
      .swagger-ui .opblock .opblock-summary-path-description-wrapper {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 0 10px;
        padding: 0 10px;
        width: 100%;
      }
    `,
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
