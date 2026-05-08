export const getMediaById = (id: number) => ({
  text: `SELECT
    id,
    type,
    name,
    width,
    height,
    created_at
  FROM
    media
  WHERE
    id=$1
  `,
  values: [id]
})

export const insertMedia = () =>
  `INSERT
    INTO media
    (type, name, width, height)
    VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `

export const deleteMedia = (id: number) => ({
  text: `DELETE
  FROM
    media
  WHERE id=$1
  `,
  values: [id]
})
