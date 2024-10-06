import { Subscription } from '@domain/entities'
import { SubscriptionRepository } from '@domain/repositories'
import * as queries from './queries'
import { revalidateTag, unstable_cache } from 'next/cache'

export default class SubscriptionRepositoryImpl implements SubscriptionRepository {
  private database: any
  private logger: any

  constructor(database: any, logger: unknown) {
    this.database = database
    this.logger = logger
  }

  async create(data: any): Promise<Subscription> {
    this.logger.info({ data }, 'Subscription creation started')
    const result = await this.database.query(queries.insertSubscription(), [data])
    revalidateTag('subscriptions_all')
    revalidateTag('subscription_pagination')
    revalidateTag('subscriptions_count')
    this.logger.info({ response: result.rows[0] }, 'Subscription created successfully')
    return result.rows[0]
  }

  async getById(id: number): Promise<Subscription | null> {
    this.logger.info({ id }, 'Subscription getting started')
    const response = await unstable_cache(
      async (id: number) => {
        const result = await this.database.query(queries.getSubscriptionById(id))
        return result.rows[0] || null
      },
      [`subscription_${id}`],
      {
        tags: [`subscription_${id}`]
      }
    )(id)
    this.logger.info(response, 'Subscription retrieved successfully')
    return response
  }

  async getAll(): Promise<Subscription[]> {
    this.logger.info('Subscriptions getting started')
    const response = await unstable_cache(
      async () => {
        const result = await this.database.query(queries.getSubscriptions())
        return result.rows
      },
      [],
      {
        tags: ['subscriptions_all']
      }
    )()
    this.logger.info({ response }, 'Subscriptions retrieved successfully')
    return response
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Subscription deletion started')
    await this.database.query(queries.deleteSubscription(id))
    revalidateTag(`subscription_${id}`)
    revalidateTag('subscriptions_all')
    revalidateTag('subscription_pagination')
    revalidateTag('subscriptions_count')
    this.logger.info({ id }, 'Subscription deleted successfully')
  }

  async getSubscriptions(offset: number, limit: number) {
    this.logger.info({ offset, limit }, 'Subscriptions page getting started')
    const response = await unstable_cache(
      async (offset: number, limit: number) => {
        const options = `OFFSET ${offset} LIMIT ${limit}`
        const result = await this.database.query(queries.getSubscriptions({ options }))
        return result.rows
      },
      [`offset=${offset}_limit=${limit}`],
      {
        tags: ['subscription_pagination']
      }
    )(offset, limit)
    this.logger.info({ response }, 'Subscriptions page retrieved successfully')
    return response
  }

  async countSubscriptions(): Promise<number> {
    this.logger.info('Subscriptions count started')
    const response = await unstable_cache(
      async () => {
        const result = await this.database.query(queries.count())
        return Number(result.rows[0].count)
      },
      ['subscriptions_count'],
      {
        tags: ['subscriptions_count']
      }
    )()
    this.logger.info({ response }, 'Subscriptions counted successfully')
    return response
  }
}
