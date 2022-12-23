import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repositorie';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(user);
    const prismaUser = await this.prisma.user.create({
      data: raw,
    });

    return PrismaUserMapper.toDomain(prismaUser);
  }
  async findByID(userID: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userID },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
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
  async findByName(userName: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        name: userName,
      },
    });

    return users.map(PrismaUserMapper.toDomain);
  }
  async listAllusers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(PrismaUserMapper.toDomain);
  }
  async update(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
