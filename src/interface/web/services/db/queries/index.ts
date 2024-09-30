export * from './photos'
export * from './subscriptions'
export * from './users'
export * from './media'

export const count = (table: string) => `SELECT count(*) FROM ${table}`
