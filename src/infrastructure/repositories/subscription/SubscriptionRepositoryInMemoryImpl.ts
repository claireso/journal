import { Subscription } from '@domain/entities'
import { SubscriptionRepository } from '@domain/repositories'

export default class SubscriptionRepositoryInMemoryImpl implements SubscriptionRepository {
  private subscriptions: Subscription[]

  constructor() {
    this.subscriptions = [
      {
        id: 1,
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        updated_at: new Date('2024-10-05T17:12:40.400Z'),
        subscription: {
          keys: {
            p256dh: '',
            auth: ''
          },
          endpoint: '',
          expirationTime: 1234
        }
      },
      {
        id: 2,
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        updated_at: new Date('2024-10-05T17:12:40.400Z'),
        subscription: {
          keys: {
            p256dh: '',
            auth: ''
          },
          endpoint: '',
          expirationTime: 1234
        }
      },
      {
        id: 3,
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        updated_at: new Date('2024-10-05T17:12:40.400Z'),
        subscription: {
          keys: {
            p256dh: '',
            auth: ''
          },
          endpoint: '',
          expirationTime: 1234
        }
      }
    ]
  }

  async create(data: any): Promise<Subscription> {
    const lastSubscription = this.subscriptions.at(-1) as Subscription
    const newSubscription = {
      id: lastSubscription.id + 1,
      created_at: new Date('2024-10-05T17:12:40.400Z'),
      updated_at: new Date('2024-10-05T17:12:40.400Z'),
      ...data
    }
    this.subscriptions.push(newSubscription)
    return newSubscription
  }

  async getById(id: number): Promise<Subscription | null> {
    const subscription = this.subscriptions.find((_subscription) => _subscription.id === id)
    return subscription || null
  }

  async getAll(): Promise<Subscription[]> {
    return this.subscriptions
  }

  async delete(id: number): Promise<void> {
    this.subscriptions = this.subscriptions.filter((subscription) => subscription.id !== id)
  }

  async getSubscriptions(offset: number, limit: number) {
    const subscriptions = this.subscriptions.slice(offset, limit)
    return subscriptions
  }

  async countSubscriptions(): Promise<number> {
    return this.subscriptions.length
  }
}
