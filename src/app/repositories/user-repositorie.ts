import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByID(userID: string): Promise<User | null>;
  abstract findByEmail(userEmail: string): Promise<User | null>;
  abstract listAllusers(): Promise<User[]>;
  abstract update(user: User): Promise<void>;
  abstract deleteUser(userID: string): Promise<void>;
}
