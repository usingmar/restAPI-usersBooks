import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/book/book.module';

import { UserController } from './user.controller';
import { User_ } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User_]), forwardRef(() => BookModule)],
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
