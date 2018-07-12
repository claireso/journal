import express from 'express'

import photos from './photos'
import subscriptions from './subscriptions'

const router = express.Router()


router.use('/photos', photos)
router.use('/subscriptions', subscriptions)

export default router
