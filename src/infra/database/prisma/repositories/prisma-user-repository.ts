import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repositorie';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({
      data: raw,
    });
  }
  findByID(userID: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  async findByEmail(userEmail: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
  findByName(userName: string): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  listAllusers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteUser(userID: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
