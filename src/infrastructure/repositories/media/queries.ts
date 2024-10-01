export const getMediaById = (id: number) =>
  `SELECT
    id,
    type,
    name,
    width,
    height,
    created_at
  FROM
    media
  WHERE
    id=${id}
  `

export const insertMedia = () =>
  `INSERT
    INTO media
    (type, name, width, height)
    VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `

export const deleteMedia = (id: number) =>
  `DELETE
  FROM
    media
  WHERE id=${id}
  `
