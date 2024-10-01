import { Pager, Subscriptions } from '@domain/entities'
import { SubscriptionRepository } from '@domain/repositories'

export default class SubscriptionService {
  private repository: SubscriptionRepository

  constructor(repository: SubscriptionRepository) {
    this.repository = repository
  }

  async create(data: any) {
    return this.repository.create(data)
  }

  async getById(id: number) {
    return this.repository.getById(id)
  }

  async getAll() {
    return this.repository.getAll()
  }

  async delete(id: number) {
    const subscription = await this.getById(id)
    if (subscription === null) {
      throw new Error('Not found')
    }

    return this.repository.delete(id)
  }

  async getPaginatedSubscriptions(page: number) {
    const pageSize = 10

    const count = await this.repository.countSubscriptions()
    const totalPages = Math.ceil(count / pageSize)

    if (page < 1 || (page > 1 && page > totalPages)) {
      throw new Error('Not found')
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
}