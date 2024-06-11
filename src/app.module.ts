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
    ConfigModule.forRoot(), // Carrega as variáveis de ambiente do .env
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any, // Usa o tipo do banco de dados do .env
      database: process.env.DB_DATABASE, // Usa o nome do banco do .env
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Autoload entities
      synchronize: true, // Cria as tabelas automaticamente (cuidado em produção!)
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
