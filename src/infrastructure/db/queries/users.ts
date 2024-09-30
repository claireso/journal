export const find_user_by_username = (username: string, password: string) =>
  `SELECT
    id,
    cid,
    username
  FROM
    users
  WHERE
    username='${username}'
    AND
    password=crypt('${password}', password)`
