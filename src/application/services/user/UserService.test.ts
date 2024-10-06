import { UserRepository } from '@domain/repositories'
import UserRepositoryInMemoryImpl from '@infrastructure/repositories/user/UserRepositoryInMemoryImpl'
import UserService from './UserService'

describe('application/UserService', () => {
  let userRepository: UserRepository
  let userService: UserService

  beforeEach(() => {
    userRepository = new UserRepositoryInMemoryImpl()
    userService = new UserService(userRepository, console)
  })

  describe('GET', () => {
    it('should get user by credentials', async () => {
      // act
      const user = await userService.authenticate('janedoe', '123')
      // assert
      expect(user).toMatchSnapshot()
    })

    it('should not get user by credential', async () => {
      // act
      const user = await userService.authenticate('janedoe123', '123')
      // assert
      expect(user).toBeNull()
    })
  })
})
