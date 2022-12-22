import { CreateUser } from '@app/use-cases/create-user';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    const { email, name, password, permission, phone } = body;

    const { user } = await this.createUser.execute({
      email,
      name,
      password,
      permission,
      phone,
    });

    return { user };
  }
}
