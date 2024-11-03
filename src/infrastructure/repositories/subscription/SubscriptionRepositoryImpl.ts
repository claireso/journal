import { Subscription } from '@domain/entities'
import { SubscriptionRepository } from '@domain/repositories'
import * as queries from './queries'

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
    this.logger.info({ response: result.rows[0] }, 'Subscription created successfully')
    return result.rows[0]
  }

  async getById(id: number): Promise<Subscription | null> {
    this.logger.info({ id }, 'Subscription getting started')
    const result = await this.database.query(queries.getSubscriptionById(id))
    const response = result.rows[0] || null
    this.logger.info(response, 'Subscription retrieved successfully')
    return response
  }

  async getAll(): Promise<Subscription[]> {
    this.logger.info('Subscriptions getting started')
    const result = await this.database.query(queries.getSubscriptions())
    const response = result.rows
    this.logger.info({ response }, 'Subscriptions retrieved successfully')
    return response
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Subscription deletion started')
    await this.database.query(queries.deleteSubscription(id))
    this.logger.info({ id }, 'Subscription deleted successfully')
  }

  async getSubscriptions(offset: number, limit: number) {
    this.logger.info({ offset, limit }, 'Subscriptions page getting started')
    const options = `OFFSET ${offset} LIMIT ${limit}`
    const result = await this.database.query(queries.getSubscriptions({ options }))
    const response = result.rows
    this.logger.info({ response }, 'Subscriptions page retrieved successfully')
    return response
  }

  async countSubscriptions(): Promise<number> {
    this.logger.info('Subscriptions count started')
    const result = await this.database.query(queries.count())
    const response = Number(result.rows[0].count)
    this.logger.info({ response }, 'Subscriptions counted successfully')
    return response
  }
}
