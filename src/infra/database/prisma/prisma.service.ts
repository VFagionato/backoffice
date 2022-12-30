import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { Encrypter } from '@helpers/Encripter';
import { makeUser } from '@test/factories/user-factory';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Seed');
  private readonly encrypter = new Encrypter();

  constructor() {
    super({
      log: [],
    });
  }
  async onModuleInit() {
    await this.$connect();

    const users = await this.user.findMany();

    if (!users.length) {
      await this.cleanAndPopulate();
      return;
    }

    this.logger.warn('Database already populated');
    this.logger.warn(
      'if you want to rebase, go to src/infra/database/prisma/prisma.service.ts, edit the "onModuleInit()" function.',
    );
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async cleanAndPopulate() {
    await this.user.deleteMany();
    this.logger.log('Formating database');

    const root = makeUser({
      name: 'root',
      password: await this.encrypter.hash('admin'),
      email: 'root@mail.com',
      permission: 1,
    });

    await this.user.create({
      data: {
        id: root.id,
        name: root.name,
        password: root.password,
        email: root.email,
        permission: root.permission,
        phone: root.phone,
        createdAt: root.createdAt,
      },
    });
    this.logger.log('root was created');
    this.logger.log('use this data to log as root');
    this.logger.log({
      email: root.email,
      name: root.name,
      password: 'admin',
    });

    this.logger.log('seeding DB 🌱');

    for (let i = 0; i <= 10; i++) {
      const user = makeUser({
        password: await this.encrypter.hash(faker.internet.password()),
      });

      await this.user.create({
        data: {
          id: user.id,
          name: user.name,
          password: user.password,
          email: user.email,
          permission: user.permission,
          phone: user.phone,
          createdAt: user.createdAt,
        },
      });
    }

    this.logger.log('Database already seeded');
  }
}
