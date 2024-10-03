import { User } from '@domain/entities'
import { UserRepository } from '@domain/repositories'
import * as queries from './queries'

export default class UserRepositoryImpl implements UserRepository {
  private database: any
  private logger: any

  constructor(database: any, logger: unknown) {
    this.database = database
    this.logger = logger
  }

  async getByCredentials(username: string, password: string): Promise<User | null> {
    this.logger.info({ username }, 'User authentication started')
    const result = await this.database.query(queries.getUserByCredentials(username, password))
    this.logger.info(result.rows[0], 'User authenticated successfully')
    return result.rows[0] || null
  }
}
