import { MediaService, PhotoService, SubscriptionService, UserService } from '@application/services'
import {
  MediaRepositoryImpl,
  UserRepositoryImpl,
  SubscriptionRepositoryImpl,
  PhotoRepositoryImpl
} from '@infrastructure/repositories'
import { pool as db } from '@infrastructure/db'

const mediaRepository = new MediaRepositoryImpl(db)
const mediaService = new MediaService(mediaRepository)

const userReposity = new UserRepositoryImpl(db)
const userService = new UserService(userReposity)

const subscriptionRepository = new SubscriptionRepositoryImpl(db)
const subscriptionService = new SubscriptionService(subscriptionRepository)

const photoRepository = new PhotoRepositoryImpl(db)
const photoService = new PhotoService(photoRepository, mediaRepository)

export { mediaService, userService, subscriptionService, photoService }
