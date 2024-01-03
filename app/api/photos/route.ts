import { NextRequest } from 'next/server'
import { createRouteHandler, withPagination, withAuth } from '@services/middlewares'
import { pool, queries, models } from '@services/db'
import uploadFile from '@utils/uploadFile'

const formatPhoto = models.formatPhoto
const photoModel = models.photo

// GET ALL PHOTOS
const getAllPhotos = async (request: NextRequest & { pager: Pager }) => {
  const response = await pool.query(
    queries.get_photos({
      options: `OFFSET ${request.pager.offset} LIMIT ${request.pager.limit}`
    })
  )

  return Response.json(
    {
      items: response.rows.map(formatPhoto),
      pager: request.pager
    },
    { status: 200 }
  )
}

// CREATE PHOTO
const createPhoto = async (request: NextRequest) => {
  const formData = await request.formData()

  const fileToUpload = formData.get('file') as File
  const file = await uploadFile(fileToUpload)

  const title = formData.get('title') as Photo['title']
  const description = formData.get('description') as Photo['description']
  const position = formData.get('position') as Photo['position']

  const photo = photoModel({
    title,
    description,
    position,
    name: file.filename,
    width: file.width,
    height: file.height
  })

  const response = await pool.query(queries.insert_photo(), [
    photo.title,
    photo.description,
    photo.name,
    photo.position,
    photo.portrait,
    photo.square
  ])

  return Response.json(formatPhoto(response.rows[0]), { status: 201 })

  // // send web-push notification
  // if (IS_NOTIFICATIONS_ENABLED) {
  //   const responseForPreviousPhoto = await pool.query(queries.get_previous_photo())
  //   if (responseForPreviousPhoto.rowCount === 1) {
  //     const previousPhoto = responseForPreviousPhoto.rows[0]
  //     // do not send web push if the previous photo was posted less than 30 minutes ago
  //     if (differenceInMinutes(new Date(), new Date(previousPhoto.created_at)) < 30) {
  //       return
  //     }
  //   }
  //   const responseSub = await pool.query(queries.get_subscriptions())
  //   const subscriptions = responseSub.rows
  //   subscriptions.map(({ subscription, id }) =>
  //     sendNotification(subscription, NOTIFICATION_NEW_PHOTO).catch((err) => {
  //       if (err && [410, 404].includes(err.statusCode)) {
  //         pool.query(queries.delete_subscription(id))
  //       }
  //     })
  //   )
  // }
}

const GET = createRouteHandler(withPagination('photos'), getAllPhotos)

const POST = createRouteHandler(withAuth, createPhoto)

export { GET, POST }
