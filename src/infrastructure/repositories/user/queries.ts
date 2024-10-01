export const getUserByCredentials = (username: string, password: string) =>
  `SELECT
    id,
    cid,
    username,
    created_at,
    updated_at
  FROM
    users
  WHERE
    username='${username}'
    AND
    password=crypt('${password}', password)`
