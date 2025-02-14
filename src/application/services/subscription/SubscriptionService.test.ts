import { SubscriptionRepository } from '@domain/repositories'
import SubscriptionRepositoryInMemoryImpl from '@infrastructure/repositories/subscription/SubscriptionRepositoryInMemoryImpl'
import SubscriptionService from './SubscriptionService'

describe('application/SubscriptionService', () => {
  let subscriptionRepository: SubscriptionRepository
  let subscriptionService: SubscriptionService

  beforeEach(() => {
    subscriptionRepository = new SubscriptionRepositoryInMemoryImpl()
    subscriptionService = new SubscriptionService(subscriptionRepository, console)
  })

  describe('CREATE', () => {
    it('should create a subscription successfully', async () => {
      // arrange
      const data = {
        subscription: {
          keys: {
            p256dh: '123',
            auth: '456'
          },
          endpoint: '789',
          expirationTime: 1234
        }
      }

      // act
      const subscription = await subscriptionService.create(data)

      // assert
      expect(subscription).toMatchSnapshot()
    })
  })

  describe('GET', () => {
    it('should get a subscription by identifier', async () => {
      // act
      const subscription = await subscriptionService.getById(1)
      // assert
      expect(subscription).toMatchSnapshot()
    })
    it('should throw a NotFoundError error when getting a subscription with invalid id', async () => {
      // act
      const promise = subscriptionService.getById(1000)
      // arrange
      await expect(promise).rejects.toThrow('Subscription not found')
    })
    it('should get paginated subscriptions', async () => {
      // act
      const paginatedSubscriptions = await subscriptionService.getPaginatedSubscriptions(1)
      //assert
      expect(paginatedSubscriptions).toMatchSnapshot()
    })
    it('should throw a NotFoundError error when getting paginated subscriptions with invalid page', async () => {
      // act
      const promise = subscriptionService.getPaginatedSubscriptions(1000)
      //assert
      expect(promise).rejects.toThrow('Page subscription not found')
    })
    it('should get all subscriptions', async () => {
      // act
      const subscriptions = await subscriptionService.getAll()
      //assert
      expect(subscriptions).toMatchSnapshot()
    })
    it('should get subscription by endpoint', async () => {
      // arrange
      const endpoint = 'https://fcm.googleapis.com/fcm/send/1'
      // act
      const subscription = await subscriptionService.getSubscriptionByEndpoint(endpoint)
      //assert
      expect(subscription).toMatchSnapshot()
    })
    it('should not get subscription by endpoint', async () => {
      // arrange
      const endpoint = 'https://fcm.googleapis.com/fcm/send/1000'
      // act
      const promise = subscriptionService.getSubscriptionByEndpoint(endpoint)
      //assert
      expect(promise).rejects.toThrow('Subscription not found')
    })
  })

  describe('DELETE', () => {
    it('should delete subscription successfully', async () => {
      // act
      await subscriptionService.delete(1)

      // assert
      expect(subscriptionService.getById(1)).rejects.toThrow('Subscription not found')
    })

    it('should throw a NotFoundError error when deleting subscription with invalid id', async () => {
      // assert
      expect(subscriptionService.delete(1000)).rejects.toThrow('Subscription not found')
    })
  })
})
