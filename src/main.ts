import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

async function bootstrap() {
  const uploadDir = resolve(__dirname, '..', '..', 'uploads');
  if (!existsSync(uploadDir)) {
    console.log('Creating upload directory:', uploadDir);
    mkdirSync(uploadDir, { recursive: true });
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
