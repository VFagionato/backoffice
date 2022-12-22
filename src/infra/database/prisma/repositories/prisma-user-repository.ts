import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repositorie';
import { PrismaService } from '../prisma.service';
// import { PrismaUsermapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    // const raw = PrismaUsermapper.toPrisma(user);
    await this.prisma.user.create({
      data: user,
    });
  }
  findByID(userID: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByEmail(userEmail: string): Promise<User[]> {
    throw new Error('Method not implemented.');
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
