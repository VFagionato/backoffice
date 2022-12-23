import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { FindById } from './find-by-id';

describe('Find User by Name', () => {
  let userRepository: InMemoryUserRepository;
  let findByID: FindById;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findByID = new FindById(userRepository);
  });

  it('should be able to find a user by name', async () => {
    const createdUser = await userRepository.create(makeUser());
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());

    const { user } = await findByID.execute({ userId: createdUser.id });

    expect(user).toEqual(createdUser);
  });

  it("should return null if don't find a users by name", async () => {
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());

    const { user } = await findByID.execute({
      userId: 'invalid-id',
    });

    expect(user).toBeNull();
  });
});
