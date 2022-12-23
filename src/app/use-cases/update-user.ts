import { UserProps } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Encrypter } from '@helpers/Encripter';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface UpdateUserRequest extends Partial<UserProps> {
  targetId: string;
}

type UpdateUserResponse = void;

@Injectable()
export class UpdateUser {
  constructor(
    private repository: UserRepository,
    private encrypter: Encrypter,
  ) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { targetId } = request;

    const user = await this.repository.findByID(targetId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    for (const [key, value] of Object.entries(request)) {
      if (key == 'targetId') continue;

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
