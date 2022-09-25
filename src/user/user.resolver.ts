import { Resolver, Query, Args, ID, Mutation, Int } from '@nestjs/graphql';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User_ } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => User_)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => [User_])
  async users(): Promise<User_[]> {
    return this.userService.findAll();
  }

  @Query(returns => User_)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(returns => User_)
  createUser(@Args('CreateUserInput') createUserInput: CreateUserDTO): Promise<User_> {
    return this.userService.create(createUserInput);
  }

  @Mutation(returns => User_)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('UpdateUserInput') updateUserInput: UpdateUserDTO,
  ): Promise<User_> {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(returns => User_)
  deleteUser(@Args('id', {type: () => Int}) id: number): Promise<User_>{
    return this.userService.delete(id);
  }
}
