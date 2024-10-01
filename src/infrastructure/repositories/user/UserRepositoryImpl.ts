import { User } from '@domain/entities'
import { UserRepository } from '@domain/repositories'
import * as queries from './queries'

export default class UserRepositoryImpl implements UserRepository {
  private database: any

  constructor(database: any) {
    this.database = database
  }

  async getByCredentials(username: string, password: string): Promise<User | null> {
    const result = await this.database.query(queries.getUserByCredentials(username, password))
    return result.rows[0] || null
  }
}
