import { Module } from '@nestjs/common';
import { UserRepository } from 'src/app/repositories/user-repositorie';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
