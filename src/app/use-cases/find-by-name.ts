import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Injectable } from '@nestjs/common';

export interface FindUserByNameRequest {
  name: string;
}

export interface FindUserByNameResponse {
  users: User[] | null;
}

@Injectable()
export class FindByName {
  constructor(private repository: UserRepository) {}

  async execute(
    request: FindUserByNameRequest,
  ): Promise<FindUserByNameResponse> {
    const { name } = request;
    const users = await this.repository.findByName(name);

    if (!users.length) {
      return { users: null };
    }

    return { users };
  }
}
