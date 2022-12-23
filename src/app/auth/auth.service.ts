import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';
import { Encrypter } from '@helpers/Encripter';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    private userResitory: UserRepository,
    private encrypter: Encrypter,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userResitory.findByEmail(email);

    if (!user || user.deletedAt) {
      return null;
    }

    const isValid = await this.encrypter.compare(pass, user.password);

    if (!isValid) {
      return null;
    }

    return user;
  }

  async login(user: Partial<User>) {
    const payload = {
      sub: {
        requesterId: user.id,
        permission: user.permission,
      },
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
