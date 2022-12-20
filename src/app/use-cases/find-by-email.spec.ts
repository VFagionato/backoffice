import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { FindByEmail } from './find-by-email';

describe('Find User by Name', () => {
  let userRepository: InMemoryUserRepository;
  let findByEmail: FindByEmail;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findByEmail = new FindByEmail(userRepository);
  });

  it('should be able to find a user by name', async () => {
    const createdUser = await userRepository.create(
      makeUser({ email: 'target@mail.com' }),
    );
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());

    const { users } = await findByEmail.execute({ email: 'target@mail.com' });

    expect(users).toHaveLength(1);

    if (users) {
      expect(users[0]).toEqual(createdUser);
    }
  });

  it("should return null if don't find a users by name", async () => {
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());
    await userRepository.create(makeUser());

    const { users } = await findByEmail.execute({
      email: 'invalid@mail.com',
    });

    expect(users).toBeNull();
  });
});
