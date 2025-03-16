import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    cors: true,
    bodyParser: true,
  });
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });
  setUpSwagger(app);
  await app.listen(Number(process.env.PORT));
}
void bootstrap();
