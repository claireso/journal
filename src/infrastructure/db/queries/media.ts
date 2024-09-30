export const get_media = (id: number) =>
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

export const insert_media = () =>
  `INSERT
    INTO media
    (type, name, width, height)
    VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `

export const delete_media = (id: number) =>
  `DELETE
  FROM
    media
  WHERE id=${id}
  `
