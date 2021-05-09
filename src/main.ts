import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useStaticAssets(path.join(__dirname, '/../public'));
  // app.use(express.static(join(process.cwd(), '../client/dist/')));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
