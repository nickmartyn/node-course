import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ShutdownSignal } from '@nestjs/common';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks([ShutdownSignal.SIGTERM, ShutdownSignal.SIGINT]);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tea example')
    .setDescription('The Tea API description')
    .setVersion('1.0')
    .addApiKey({ name: 'x-api-key', in: 'header', type: 'apiKey' }, 'x-api-key')
    .addTag('Tea')
    .build();

  patchNestjsSwagger();

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  const port = process.env.PORT ?? 3000;

  console.log(`Swagger docs available at http://localhost:${port}/docs`);

  await app.listen(port);
}

bootstrap();
