import type { Subscription } from '@domain/entities'

export interface SubscriptionRepository {
  create(data: object): Promise<Subscription>
  getById(id: number): Promise<Subscription | null>
  getAll(): Promise<Subscription[]>
  delete(subscription: Subscription): Promise<void>
  getSubscriptions(offset: number, limit: number): Promise<Subscription[]>
  countSubscriptions(): Promise<number>
  getSubscriptionByEndpoint(endpoint: string): Promise<Subscription | null>
}
