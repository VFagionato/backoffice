import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { FindUserByName } from './find-user-by-name';

describe('Find User by Name', () => {
  let userRepository: InMemoryUserRepository;
  let findUserByName: FindUserByName;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findUserByName = new FindUserByName(userRepository);
  });

  it('should be able to find a user by name', async () => {
    const createdUser = await userRepository.create(
      makeUser({ name: 'target-name' }),
    );
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());

    const { users } = await findUserByName.execute({ name: 'target-name' });

    expect(users).toHaveLength(1);

    if (users) {
      expect(users[0]).toEqual(createdUser);
    }
  });

  it("should return null if don't find a users by name", async () => {
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());

    const { users } = await findUserByName.execute({
      name: 'invalid-user-name',
    });

    expect(users).toBeNull();
  });
});
