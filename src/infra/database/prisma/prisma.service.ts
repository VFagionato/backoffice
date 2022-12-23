import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { User } from '@app/entities/user';
import { Encrypter } from '@helpers/Encripter';

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
    await this.user.deleteMany();
    this.logger.log('Formating database');

    const root = new User({
      name: 'root',
      password: await this.encrypter.hash('admin'),
      email: 'root@mail.com',
      permission: 1,
      phone: '11947292091',
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
      const user = new User({
        name: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        permission: 0,
        phone: faker.phone.number(),
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

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
