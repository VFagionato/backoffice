import { CreateUser } from '@app/use-cases/create-user';
import { DeleteUser } from '@app/use-cases/delete-user';
import { FindByEmail } from '@app/use-cases/find-by-email';
import { FindById } from '@app/use-cases/find-by-id';
import { FindByName } from '@app/use-cases/find-by-name';
import { ListUsers } from '@app/use-cases/list-users';
import { UpdateUser } from '@app/use-cases/update-user';
import { Encrypter } from '@helpers/Encripter';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUser,
    DeleteUser,
    Encrypter,
    FindByEmail,
    FindById,
    FindByName,
    ListUsers,
    UpdateUser,
  ],
})
export class HttpModule {}
