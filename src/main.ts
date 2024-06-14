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

//   // const publicDir = path.join(__dirname, '..', 'public');
//   // app.use('/api-docs', express.static(publicDir));

//   await app.listen(process.env.PORT || 3000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // swagger setup
//   const config = new DocumentBuilder()
//     .setTitle('Backend Generator')
//     .setDescription('Documentation API Test')
//     .setVersion('1.0')
//     .setBasePath('api/v1')
//     .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('swagger', app, document, {
//     customSiteTitle: 'Backend Generator',
//     customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
//     customJs: [
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
//     ],
//     customCssUrl: [
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
//     ],
//   });

//   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
//   app.setGlobalPrefix('api/v1');
//   useContainer(app.select(AppModule), { fallbackOnErrors: true });
//   await app.listen(process.env.PORT || 3000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT || 3000);

  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
  }
}

bootstrap();
