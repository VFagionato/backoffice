import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { Roles } from '@app/auth/roles.decorator';
import { CreateUser } from '@app/use-cases/create-user';
import { DeleteUser } from '@app/use-cases/delete-user';
import { FindByEmail } from '@app/use-cases/find-by-email';
import { FindById } from '@app/use-cases/find-by-id';
import { FindByName } from '@app/use-cases/find-by-name';
import { ListUsers } from '@app/use-cases/list-users';
import { UpdateUser } from '@app/use-cases/update-user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { FindUserDTO } from '../dtos/find-user.dto';

@Controller('/user')
export class UserController {
  private readonly logger = new Logger();
  constructor(
    private createUser: CreateUser,
    private findById: FindById,
    private findByEmail: FindByEmail,
    private findByName: FindByName,
    private listUsers: ListUsers,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/index')
  @Roles('admin')
  async listAllUsers() {
    return await this.listUsers.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find')
  @Roles('admin')
  async getByEmailOrName(@Query() query: FindUserDTO) {
    this.logger.debug('oi');
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

  @UseGuards(JwtAuthGuard)
  @Get('')
  async returnUser(@Request() req) {
    const { requesterId } = req.user.payload;

    return await this.findById.execute({ userId: requesterId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @Roles('admin')
  async getById(@Param('id') id: string, @Request() req) {
    const { user } = await this.findById.execute({ userId: id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Roles('admin', 'user')
  async userUpdate(
    @Param('id') id: string,
    @Body() body: Partial<CreateUserDTO>,
  ) {
    await this.updateUser.execute({
      targetId: id,
      ...body,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles('admin', 'user')
  async deleteAUser(@Param('id') id: string) {
    await this.deleteUser.execute({
      targetId: id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles('admin')
  async create(@Body() body: CreateUserDTO, @Request() req) {
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
