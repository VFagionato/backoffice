import { Encrypter } from '@helpers/Encripter';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { UpdateUser } from './update-user';

describe('Update Users', () => {
  it('should be able to update a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const updateUser = new UpdateUser(userRepository, encrypter);

    const user = await userRepository.create(makeUser());

    await updateUser.execute(user.id, {
      name: 'new Name',
    });

    expect(userRepository.users[0].updatedAt).toEqual(expect.any(Date));
    expect(userRepository.users[0].name).toEqual(user.name);
  });
});
