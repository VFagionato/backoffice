import { UserRepository } from '@app/repositories/user-repositorie';
import { Encrypter } from '@helpers/Encripter';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface UpdateUserRequest {
  name: string;
  password: string;
  email: string;
  permission: number;
  phone: string;
}

type UpdateUserResponse = void;

@Injectable()
export class UpdateUser {
  constructor(
    private repository: UserRepository,
    private encrypter: Encrypter,
  ) {}

  async execute(
    userId: string,
    request: Partial<UpdateUserRequest>,
  ): Promise<UpdateUserResponse> {
    const user = await this.repository.findByID(userId);

    if (!user) {
      throw new NotFoundException();
    }

    for (const [key, value] of Object.entries(request)) {
      if (key === 'password') {
        const hashedPassword = await this.encrypter.hash(String(value));
        user.password = hashedPassword;
      }

      user[key] = value;
    }

    user.update();

    await this.repository.update(user);
  }
}
