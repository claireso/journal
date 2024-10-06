import { MediaService, PhotoService, SubscriptionService, UserService } from '@application/services'
import {
  MediaRepositoryImpl,
  UserRepositoryImpl,
  SubscriptionRepositoryImpl,
  PhotoRepositoryImpl
} from '@infrastructure/repositories'
import { pool as db } from '@infrastructure/db'
import { createContextLogger } from '@infrastructure/logger'

const mediaLogger = createContextLogger('media')
const mediaRepository = new MediaRepositoryImpl(db, createContextLogger('[Repository] ', mediaLogger))
const mediaService = new MediaService(mediaRepository, createContextLogger('[Service] ', mediaLogger))

const userLogger = createContextLogger('user')
const userReposity = new UserRepositoryImpl(db, createContextLogger('[Repository] ', userLogger))
const userService = new UserService(userReposity, createContextLogger('[Service ]', userLogger))

const subscriptionLogger = createContextLogger('subscription')
const subscriptionRepository = new SubscriptionRepositoryImpl(
  db,
  createContextLogger('[Repository] ', subscriptionLogger)
)
const subscriptionService = new SubscriptionService(
  subscriptionRepository,
  createContextLogger('[Service] ', subscriptionLogger)
)

const photoLogger = createContextLogger('photo')
const photoRepository = new PhotoRepositoryImpl(db, createContextLogger('[Repository] ', photoLogger))
const photoService = new PhotoService(photoRepository, mediaRepository, createContextLogger('[Service] ', photoLogger))

export { mediaService, userService, subscriptionService, photoService }
