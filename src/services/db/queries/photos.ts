export const get_photos = ({ options = '' } = {}) =>
  `SELECT
    p.id as photo_id,
    p.title,
    p.description,
    p.name as photo_name,
    p.position,
    p.portrait,
    p.color,
    p.square,
    p.updated_at,
    p.created_at as photo_created_at,
    m.id as media_id,
    m.created_at as media_created_at,
    m.type as media_type,
    m.name as media_name,
    m.width as media_width,
    m.height as media_height
  FROM
    photos p
  LEFT JOIN
    media m ON p.media_id = m.id
  ORDER BY
    p.created_at DESC
  ${options}
  `

export const insert_photo = () =>
  `
    WITH inserted_photo AS (
      INSERT
        INTO photos
        (name, title, description, position, color, media_id)
        VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING *
    )
    SELECT
      p.id as photo_id,
      p.title,
      p.description,
      p.name as photo_name,
      p.position,
      p.portrait,
      p.color,
      p.square,
      p.updated_at,
      p.created_at as photo_created_at,
      m.id as media_id,
      m.created_at as media_created_at,
      m.type as media_type,
      m.name as media_name,
      m.width as media_width,
      m.height as media_height
    FROM inserted_photo p
    LEFT JOIN media m ON p.media_id = m.id;
  `

export const update_photo = (id: number, fields: string) =>
  `
  WITH updated_photo AS (
    UPDATE
      photos
    SET
      ${fields}
    WHERE
      id=${id}
    RETURNING *
  )
  SELECT
    p.id as photo_id,
    p.title,
    p.description,
    p.name as photo_name,
    p.position,
    p.portrait,
    p.color,
    p.square,
    p.updated_at,
    p.created_at as photo_created_at,
    m.id as media_id,
    m.created_at as media_created_at,
    m.type as media_type,
    m.name as media_name,
    m.width as media_width,
    m.height as media_height
  FROM updated_photo p
  LEFT JOIN media m ON p.media_id = m.id;
  `

export const get_photo = (id: number) =>
  `SELECT
    p.id as photo_id,
    p.title,
    p.description,
    p.name as photo_name,
    p.position,
    p.portrait,
    p.color,
    p.square,
    p.updated_at,
    p.created_at as photo_created_at,
    m.id as media_id,
    m.created_at as media_created_at,
    m.type as media_type,
    m.name as media_name,
    m.width as media_width,
    m.height as media_height
  FROM
    photos p
  LEFT JOIN
    media m ON p.media_id = m.id
  WHERE
    p.id=${id}`

export const get_photo_by_media = (mediaId: number) =>
  `SELECT
    id
  FROM
    photos
  WHERE
    media_id=${mediaId}`

export const get_previous_photo = ({ fields = '*' } = {}) =>
  `SELECT
    ${fields}
  FROM
    photos
  ORDER BY
    created_at
  DESC
  LIMIT 1
  OFFSET 1
  `

export const delete_photo = (id: number) =>
  `DELETE
  FROM
    photos
  WHERE id=${id}
  `
