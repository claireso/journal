import { unstable_cache, revalidateTag } from 'next/cache'
import { Subscription } from '@domain/entities'
import { SubscriptionInsertDto } from '@dto'
import { SubscriptionRepository } from '@domain/repositories'
import * as queries from './queries'

export default class SubscriptionRepositoryImpl implements SubscriptionRepository {
  // eslint-disable-next-line
  private database: any
  // eslint-disable-next-line
  private logger: any
  static cacheLifeTime: number = 3600 * 24 * 4 // 4 days

  // eslint-disable-next-line
  constructor(database: any, logger: any) {
    this.database = database
    this.logger = logger
  }

  async create(data: SubscriptionInsertDto): Promise<Subscription> {
    this.logger.info({ data }, 'Subscription creation started')
    const result = await this.database.query(queries.insertSubscription(), [data])
    revalidateTag('list_subscriptions')
    revalidateTag('list_all_subscriptions')
    revalidateTag('list_subscriptions_count')
    this.logger.info('Subscription created successfully')
    this.logger.debug({ response: result.rows[0] })
    return result.rows[0]
  }

  async getById(id: number): Promise<Subscription | null> {
    this.logger.info({ id }, 'Subscription getting started')

    const response = await unstable_cache(
      async (id: number) => {
        const result = await this.database.query(queries.getSubscriptionById(id))
        return result.rows[0] || null
      },
      [],
      {
        tags: [`subscription_${id}`],
        revalidate: SubscriptionRepositoryImpl.cacheLifeTime
      }
    )(id)

    this.logger.info('Subscription retrieved successfully')
    this.logger.debug({ response })
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
        tags: ['list_all_subscriptions'],
        revalidate: SubscriptionRepositoryImpl.cacheLifeTime
      }
    )()

    this.logger.info('Subscriptions retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Subscription deletion started')
    await this.database.query(queries.deleteSubscription(id))
    revalidateTag('list_subscriptions')
    revalidateTag('list_all_subscriptions')
    revalidateTag('list_subscriptions_count')
    revalidateTag(`subscription_${id}`)
    this.logger.info('Subscription deleted successfully')
  }

  async getSubscriptions(offset: number, limit: number): Promise<Subscription[]> {
    this.logger.info({ offset, limit }, 'Subscriptions page getting started')

    const response = await unstable_cache(
      async (offset, limit) => {
        const options = `OFFSET ${offset} LIMIT ${limit}`
        const result = await this.database.query(queries.getSubscriptions({ options }))
        return result.rows
      },
      [],
      {
        tags: ['list_subscriptions'],
        revalidate: SubscriptionRepositoryImpl.cacheLifeTime
      }
    )(offset, limit)

    this.logger.info('Subscriptions page retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async countSubscriptions(): Promise<number> {
    this.logger.info('Subscriptions count started')

    const response = await unstable_cache(
      async () => {
        const result = await this.database.query(queries.count())
        return Number(result.rows[0].count)
      },
      ['list_subscriptions_count'],
      {
        tags: ['list_subscriptions_count'],
        revalidate: SubscriptionRepositoryImpl.cacheLifeTime
      }
    )()

    this.logger.info('Subscriptions counted successfully')
    this.logger.debug({ response })
    return response
  }
}
