import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Injectable } from '@nestjs/common';

export interface FindByEmailRequest {
  email: string;
}

export interface FindByEmailResponse {
  users: User[] | null;
}

@Injectable()
export class FindByEmail {
  constructor(private repository: UserRepository) {}

  async execute(request: FindByEmailRequest): Promise<FindByEmailResponse> {
    const { email } = request;
    const users = await this.repository.findByEmail(email);

    if (!users.length) {
      return { users: null };
    }

    return { users };
  }
}
