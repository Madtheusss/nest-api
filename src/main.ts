import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Cria a instância da aplicação NestJS a partir do AppModule

  // Aplica o ValidationPipe globalmente para validar automaticamente os dados de entrada
  // usando as regras de validação definidas nos DTOs (Data Transfer Objects)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000); // Inicia o servidor HTTP na porta 3000 e aguarda por conexões
}

bootstrap(); // Chama a função bootstrap para iniciar a aplicação
