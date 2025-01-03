import { User } from '@domain/entities'
import { UserRepository } from '@domain/repositories'
import * as queries from './queries'

export default class UserRepositoryImpl implements UserRepository {
  // eslint-disable-next-line
  private database: any
  // eslint-disable-next-line
  private logger: any

  // eslint-disable-next-line
  constructor(database: any, logger: any) {
    this.database = database
    this.logger = logger
  }

  async getByCredentials(username: string, password: string): Promise<User | null> {
    this.logger.info({ username }, 'User authentication started')
    const result = await this.database.query(queries.getUserByCredentials(username, password))
    this.logger.info('User authenticated successfully')
    this.logger.debug({ response: result.rows[0] })
    return result.rows[0] || null
  }
}
