import type { Subscription } from '@domain/entities'

export interface SubscriptionRepository {
  create(data: object): Promise<Subscription>
  getById(id: number): Promise<Subscription | null>
  getAll(): Promise<Subscription[]>
  delete(id: number): Promise<void>
  getSubscriptions(offset: number, limit: number): Promise<Subscription[]>
  countSubscriptions(): Promise<number>
}
