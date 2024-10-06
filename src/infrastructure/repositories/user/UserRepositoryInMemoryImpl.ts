import { User } from '@domain/entities'
import { UserRepository } from '@domain/repositories'

export default class UserRepositoryInMemoryImpl implements UserRepository {
  private users: User[]

  constructor() {
    this.users = [
      {
        id: 1,
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        updated_at: new Date('2024-10-05T17:12:40.400Z'),
        cid: 'c123',
        username: 'janedoe'
      }
    ]
  }

  async getByCredentials(username: string, password: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username)
    return user || null
  }
}
