import { UserRepository } from '@domain/repositories'

export default class MediaService {
  private repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async authenticate(username: string, password: string) {
    return this.repository.getByCredentials(username, password)
  }
}
