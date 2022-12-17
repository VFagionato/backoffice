import { Encrypter } from '@helpers/Encripter';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { CreateUser } from './create-user';

describe('Create User', () => {
  it('should be able to create a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();

    const createUser = new CreateUser(userRepository, encrypter);

    const { user } = await createUser.execute(makeUser());

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });
});
