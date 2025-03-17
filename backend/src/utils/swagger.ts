import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setUpSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Engineers-Mathematical-Guide API')
    .setDescription('Full Docs For The API Endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
