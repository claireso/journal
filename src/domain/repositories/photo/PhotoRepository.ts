import { Photo, Photos } from '@domain/entities'

export interface PhotoRepository {
  create(photo: any): Promise<Photo>
  update(id: number, photo: any): Promise<Photo>
  getById(id: number): Promise<Photo | null>
  getByMediaId(mediaId: number): Promise<Photo | null>
  getPreviousPhoto(): Promise<Photo | null>
  delete(id: number): Promise<void>
  getPhotos(offset: number, limit: number): Promise<Photo[]>
  countPhotos(): Promise<number>
}
