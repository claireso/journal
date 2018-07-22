import express from 'express'

import photos from './photos'
import subscriptions from './subscriptions'
import user from './user'

const router = express.Router()

router.use('/photos', photos)
router.use('/subscriptions', subscriptions)
router.use('/', user)

export default router
