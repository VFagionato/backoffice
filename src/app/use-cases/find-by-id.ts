import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Injectable } from '@nestjs/common';

export interface FindByIdRequest {
  userId: string;
}

export interface FindByIdResponse {
  user: User | null;
}

@Injectable()
export class FindById {
  constructor(private repository: UserRepository) {}

  async execute(request: FindByIdRequest): Promise<FindByIdResponse> {
    const { userId } = request;
    const user = await this.repository.findByID(userId);

    if (!user) {
      return { user: null };
    }

    return { user };
  }
}
