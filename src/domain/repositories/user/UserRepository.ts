import { User } from '@domain/entities'

export interface UserRepository {
  getByCredentials(username: string, password: string): Promise<User | null>
}
