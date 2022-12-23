import { User } from '@app/entities/user';
import { CreateUser } from '@app/use-cases/create-user';
import { DeleteUser } from '@app/use-cases/delete-user';
import { FindByEmail } from '@app/use-cases/find-by-email';
import { FindByName } from '@app/use-cases/find-by-name';
import { ListUsers } from '@app/use-cases/list-users';
import { UpdateUser } from '@app/use-cases/update-user';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { FindUserDTO } from '../dtos/find-user.dto';

@Controller('/user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private findByEmail: FindByEmail,
    private findByName: FindByName,
    private listUsers: ListUsers,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
  ) {}

  @Get()
  async listAllUsers() {
    return await this.listUsers.execute();
  }

  @Patch(':id')
  async userUpdate(
    @Param('id') id: string,
    @Body() body: Partial<CreateUserDTO>,
  ) {
    await this.updateUser.execute({
      targetId: id,
      ...body,
    });
  }

  @Delete(':id')
  async deleteAUser(@Param('id') id: string) {
    await this.deleteUser.execute({
      targetId: id,
    });
  }

  @Get('/find')
  async getByEmailOrName(@Query() query: FindUserDTO) {
    const { email, name } = query;

    if (email) {
      const { user } = await this.findByEmail.execute({ email });
      if (!user) {
        throw new NotFoundException('no user found with that email');
      }

      return { user };
    }

    if (name) {
      const { users } = await this.findByName.execute({ name });

      if (!users) {
        throw new NotFoundException('no users found with that name');
      }

      return { users };
    }
  }

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
