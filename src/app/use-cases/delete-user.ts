import { UserProps } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Encrypter } from '@helpers/Encripter';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface DeleteUserRequest extends Partial<UserProps> {
  targetId: string;
}

type DeleteUserResponse = void;

@Injectable()
export class DeleteUser {
  constructor(private repository: UserRepository) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const { targetId } = request;

    const user = await this.repository.findByID(targetId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    user.softDelete();

    await this.repository.update(user);
  }
}
