import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.json([])
})

router.post('/', (req, res, next) => {
  res.json('new photo')
})

export default router