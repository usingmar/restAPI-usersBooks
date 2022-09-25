import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv'
import { BookModule } from './book/book.module';
dotenv.config();

console.log(process.env.DATABASE_URL);

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true
    }),
    UserModule,
    BookModule
]})
export class AppModule {}
