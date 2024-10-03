import { UserRepository } from '@domain/repositories'

export default class MediaService {
  private repository: UserRepository
  private logger: unknown

  constructor(repository: UserRepository, logger: unknown) {
    this.repository = repository
    this.logger = logger
  }

  async authenticate(username: string, password: string) {
    return this.repository.getByCredentials(username, password)
  }
}
