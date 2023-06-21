import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap(); //arbitrary naming only,
//The bootstrap method is commonly used as
//an entry point for starting the NestJS application,
