import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Carrega as variáveis de ambiente do arquivo .env na raiz do projeto
    ConfigModule.forRoot(),

    // Configura a conexão com o banco de dados usando as variáveis de ambiente
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Sincroniza o modelo de dados com o banco de dados (cuidado em produção!) 
    }),

    // Configura o servidor GraphQL com o driver Apollo e define o arquivo de schema
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Gera automaticamente o schema a partir dos resolvers e tipos
    }),

    // Importa o módulo de usuário para ser usado na aplicação
    UserModule,
  ],
  controllers: [AppController],  // Lista de controllers da aplicação
  providers: [AppService],       // Lista de providers de serviços da aplicação
})
export class AppModule { }        // Exporta o módulo para ser usado em outros lugares da aplicação
