import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByID(userID: string): Promise<User | null>;
  abstract findByEmail(userEmail: string): Promise<User | null>;
  abstract listAlluser(): Promise<User[]>;
  abstract save(user: User): Promise<void>;
  abstract deleteUser(userID: string): Promise<void>;
}
