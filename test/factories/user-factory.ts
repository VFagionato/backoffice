import { User, UserProps } from '@app/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    name: 'Any Name',
    password: 'any-password',
    email: 'valid@mail.com',
    permission: 0,
    phone: '11000000000',
    ...override,
  });
}
