import { revalidateTag } from 'next/cache'
import { type Subscription } from '@domain/entities'
import { type SubscriptionInsertDto } from '@dto'
import { type SubscriptionRepository } from '@domain/repositories'
import * as queries from './queries'

export default class SubscriptionRepositoryImpl implements SubscriptionRepository {
  // eslint-disable-next-line
  private database: any
  // eslint-disable-next-line
  private logger: any

  // eslint-disable-next-line
  constructor(database: any, logger: any) {
    this.database = database
    this.logger = logger
  }

  async create(data: SubscriptionInsertDto): Promise<Subscription> {
    this.logger.info({ data }, 'Subscription creation started')
    const result = await this.database.query(queries.insertSubscription(), [data])
    const subscription = result.rows[0]
    revalidateTag('subscription_list', 'max')
    revalidateTag(`subscription_${subscription.subscription.endpoint}`, 'max')
    revalidateTag('subscription_list_all', 'max')
    this.logger.info('Subscription created successfully')
    this.logger.debug({ response: subscription })
    return result.rows[0]
  }

  async getById(id: number): Promise<Subscription | null> {
    this.logger.info({ id }, 'Subscription getting started')

    const result = await this.database.query(queries.getSubscriptionById(id))
    const response = result.rows[0] || null

    this.logger.info('Subscription retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async getAll(): Promise<Subscription[]> {
    this.logger.info('Subscriptions getting started')

    const result = await this.database.query(queries.getSubscriptions())
    const response = result.rows

    this.logger.info('Subscriptions retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async delete(subscription: Subscription): Promise<void> {
    this.logger.info({ id: subscription.id }, 'Subscription deletion started')
    await this.database.query(queries.deleteSubscription(subscription.id))
    revalidateTag('subscription_list', 'max')
    revalidateTag(`subscription_${subscription.subscription.endpoint}`, 'max')
    revalidateTag('subscription_list_all', 'max')
    this.logger.info('Subscription deleted successfully')
  }

  async getSubscriptions(offset: number, limit: number): Promise<Subscription[]> {
    this.logger.info({ offset, limit }, 'Subscriptions page getting started')

    const options = `OFFSET ${offset} LIMIT ${limit}`
    const result = await this.database.query(queries.getSubscriptions({ options }))
    const response = result.rows

    this.logger.info('Subscriptions page retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async countSubscriptions(): Promise<number> {
    this.logger.info('Subscriptions count started')

    const result = await this.database.query(queries.count())
    const response = Number(result.rows[0].count)

    this.logger.info('Subscriptions counted successfully')
    this.logger.debug({ response })
    return response
  }

  async getSubscriptionByEndpoint(endpoint: string): Promise<Subscription | null> {
    this.logger.info({ endpoint }, 'Subscription getting started')

    const result = await this.database.query(queries.getSubscriptionByEndpoint(endpoint))
    const response = result.rows[0] || null

    this.logger.info('Subscription retrieved successfully')
    this.logger.debug({ response })
    return response
  }
}
