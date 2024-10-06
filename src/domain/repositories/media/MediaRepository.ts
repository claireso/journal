import { Media } from '@domain/entities'

export interface MediaRepository {
  create(data: Pick<Media, 'type' | 'name' | 'size'>): Promise<Media>
  getById(id: number): Promise<Media | null>
  delete(id: number): Promise<void>
}
