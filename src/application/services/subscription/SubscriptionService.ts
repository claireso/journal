import { NotFoundError } from '@domain/errors/errors'
import { Pager, Subscriptions } from '@domain/entities'
import { SubscriptionRepository } from '@domain/repositories'

export default class SubscriptionService {
  private repository: SubscriptionRepository
  private logger: unknown

  constructor(repository: SubscriptionRepository, logger: unknown) {
    this.repository = repository
    this.logger = logger
  }

  async create(data: object) {
    return this.repository.create(data)
  }

  async getById(id: number) {
    const subscription = await this.repository.getById(id)

    if (subscription === null) {
      throw new NotFoundError(`Subscription not found`, { cause: { subscriptionId: id } })
    }

    return subscription
  }

  async getAll() {
    return this.repository.getAll()
  }

  async delete(id: number) {
    const subscription = await this.getById(id)

    return this.repository.delete(subscription)
  }

  async getPaginatedSubscriptions(page: number) {
    const pageSize = 10

    const count = await this.repository.countSubscriptions()
    const totalPages = Math.ceil(count / pageSize)

    if (page < 1 || (totalPages && page > totalPages)) {
      throw new NotFoundError('Page subscription not found', { cause: { page } })
    }

    const offset = (page - 1) * pageSize

    const subscriptions = await this.repository.getSubscriptions(offset, pageSize)

    const pager: Partial<Pager> = {
      count,
      totalPages,
      offset,
      limit: pageSize
    }

    if (page > 1) {
      pager.prev = page - 1
      pager.first = 1
    }

    if (page < totalPages) {
      pager.next = page + 1
      pager.last = totalPages
    }

    return {
      items: subscriptions,
      pager
    } as Subscriptions
  }

  async getSubscriptionByEndpoint(endpoint: string) {
    const registration = await this.repository.getSubscriptionByEndpoint(endpoint)

    if (!registration) {
      throw new NotFoundError('Subscription not found', { cause: { endpoint } })
    }

    return registration
  }
}
