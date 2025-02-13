import { Subscription } from '@domain/entities'
import { SubscriptionRepository } from '@domain/repositories'
import { SubscriptionInsertDto } from '@dto'

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
          endpoint: 'https://fcm.googleapis.com/fcm/send/1',
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
          endpoint: 'https://fcm.googleapis.com/fcm/send/2',
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
          endpoint: 'https://fcm.googleapis.com/fcm/send/3',
          expirationTime: 1234
        }
      }
    ]
  }

  async create(data: SubscriptionInsertDto): Promise<Subscription> {
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

  async delete(subscription: Subscription): Promise<void> {
    this.subscriptions = this.subscriptions.filter((_subscription) => _subscription.id !== subscription.id)
  }

  async getSubscriptions(offset: number, limit: number) {
    const subscriptions = this.subscriptions.slice(offset, limit)
    return subscriptions
  }

  async countSubscriptions(): Promise<number> {
    return this.subscriptions.length
  }

  async getSubscriptionByEndpoint(endpoint: string): Promise<Subscription | null> {
    const subscription = this.subscriptions.find((_subscription) => _subscription.subscription.endpoint === endpoint)
    return subscription ?? null
  }
}
