import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV !== 'production') {
    // Configuração do Swagger
    const config = new DocumentBuilder()
      .setTitle('Libris API')
      .setDescription('API para gerenciar livros e quadrinhos')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora campos não declarados
      forbidNonWhitelisted: true, // lança erro se enviar campos indevidos
      transform: true, // transforma tipos (string -> number)
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
