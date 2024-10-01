import { Subscription } from '@domain/entities'
import { SubscriptionRepository } from '@domain/repositories'
import * as queries from './queries'

export default class SubscriptionRepositoryImpl implements SubscriptionRepository {
  private database: any // Ceci pourrait être un client Prisma, un ORM ou autre

  constructor(database: any) {
    this.database = database
  }

  async create(data: any): Promise<Subscription> {
    const result = await this.database.query(queries.insertSubscription(), [data])
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
    await this.database.query(queries.deleteSubscription(id))
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
