import crud from '@services/middlewares/crud'
import withAuth from '@services/middlewares/withAuth'

import { pool, queries } from '@services/db'

const deleteSubscription = async (req, res) => {
  const { id } = req.query

  if (isNaN(id)) {
    res.status(400).send('')
    return
  }

  try {
    const response = await pool.query(queries.find_subscription(id))
    const subscription = response.rows[0]

    if (subscription === undefined) {
      res.status(404).send('')
      return
    }

    // delete subscription from database
    await pool.query(queries.delete_subscription(id))

    res.status(200).json({ id: id })
  } catch {
    res.status(500).send('')
  }
}

export default crud({
  DELETE: [withAuth, deleteSubscription]
})
