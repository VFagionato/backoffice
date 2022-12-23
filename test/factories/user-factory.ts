import { User, UserProps } from '@app/entities/user';
import { faker } from '@faker-js/faker';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    name: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    permission: 0,
    phone: faker.phone.number('###########'),
    ...override,
  });
}
