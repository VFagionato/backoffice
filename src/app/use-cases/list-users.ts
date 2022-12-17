import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Injectable } from '@nestjs/common';

export interface ListUsersResponse {
  users: User[];
}

@Injectable()
export class ListUsers {
  constructor(private repository: UserRepository) {}

  async execute(): Promise<ListUsersResponse> {
    const users = await this.repository.listAllusers();

    return {
      users,
    };
  }
}
