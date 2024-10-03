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
    this.logger.info(result.rows[0], 'Subscription created successfully')
    return result.rows[0]
  }

  async getById(id: number): Promise<Subscription | null> {
    const result = await this.database.query(queries.getSubscriptionById(id))
    return result.rows[0] || null
  }

  async getAll(): Promise<Subscription[]> {
    const result = await this.database.query(queries.getSubscriptions())
    return result.rows
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Subscription deletion started')
    await this.database.query(queries.deleteSubscription(id))
    this.logger.info({ id }, 'Subscription deleted successfully')
  }

  async getSubscriptions(offset: number, limit: number) {
    const options = `OFFSET ${offset} LIMIT ${limit}`
    const result = await this.database.query(queries.getSubscriptions({ options }))
    return result.rows
  }

  async countSubscriptions(): Promise<number> {
    const result = await this.database.query(queries.count())
    return Number(result.rows[0].count)
  }
}
