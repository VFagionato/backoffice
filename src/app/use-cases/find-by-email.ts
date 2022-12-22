import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Injectable } from '@nestjs/common';

export interface FindByEmailRequest {
  email: string;
}

export interface FindByEmailResponse {
  user: User | null;
}

@Injectable()
export class FindByEmail {
  constructor(private repository: UserRepository) {}

  async execute(request: FindByEmailRequest): Promise<FindByEmailResponse> {
    const { email } = request;
    const user = await this.repository.findByEmail(email);

    if (!user) {
      return { user: null };
    }

    return { user };
  }
}
