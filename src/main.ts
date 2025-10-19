import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configDoc = new DocumentBuilder()
    .setTitle('API mujeres digitales 2025')
    .setDescription(
      'Documentacion de la API desarrollada en NEST para mujeres digitales',
    )
    .setVersion('2.4')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`app running on: http://localhost:${port}`);
}
bootstrap();
