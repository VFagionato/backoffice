import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { DeleteUser } from './delete-user';
import { UpdateUser } from './update-user';

describe('Update Users', () => {
  it('should be able to update a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const deleteUser = new DeleteUser(userRepository);

    const user = await userRepository.create(makeUser());

    await deleteUser.execute({
      targetId: userRepository.users[0].id,
    });

    expect(userRepository.users[0].deletedAt).toEqual(expect.any(Date));
  });
});
