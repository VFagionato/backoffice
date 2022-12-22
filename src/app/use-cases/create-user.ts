import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Encrypter } from '@helpers/Encripter';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface CreateUserRequest {
  name: string;
  password: string;
  email: string;
  permission: number;
  phone: string;
}

export interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(
    private repository: UserRepository,
    private encrypter: Encrypter,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { password, email } = request;

    const finded = await this.repository.findByEmail(email);

    if (finded) {
      throw new BadRequestException('email already exist');
    }

    const hashedPassword = await this.encrypter.hash(password);

    const user = new User({
      ...request,
      password: hashedPassword,
    });

    await this.repository.create(user);

    return {
      user,
    };
  }
}
