import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_ } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BookModule } from 'src/book/book.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User_]), forwardRef(() => BookModule)],
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
