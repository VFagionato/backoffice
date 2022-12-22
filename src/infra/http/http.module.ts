import { CreateUser } from '@app/use-cases/create-user';
import { Encrypter } from '@helpers/Encripter';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser, Encrypter],
})
export class HttpModule {}
