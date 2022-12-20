import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repositorie';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByID(userID: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === userID);

    if (!user) return null;

    return user;
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === userEmail);

    if (!user) return null;

    return user;
  }

  async findByName(userName: string): Promise<User[]> {
    const users = this.users.filter((user) => {
      if (user.name.includes(userName)) {
        return true;
      }

      return false;
    });

    return users;
  }

  async listAllusers(): Promise<User[] | []> {
    return this.users;
  }

  async update(user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }

  async deleteUser(userID: string): Promise<void> {
    const user = this.users.find((user) => user.id === userID);
    user?.softDelete();
  }
}
