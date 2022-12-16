import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repositorie';

export class PrismaUserRepository implements UserRepository {
  create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByID(userID: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByEmail(userEmail: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  listAlluser(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteUser(userID: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
