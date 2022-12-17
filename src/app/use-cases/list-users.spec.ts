import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { ListUsers } from './list-users';

describe('List Users', () => {
  it('should be able to list all users', async () => {
    const userRepository = new InMemoryUserRepository();

    await userRepository.create(makeUser());
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());

    const listUsers = new ListUsers(userRepository);

    const { users } = await listUsers.execute();

    expect(users).toHaveLength(3);
  });
});
