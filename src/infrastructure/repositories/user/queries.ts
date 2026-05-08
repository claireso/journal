export const getUserByCredentials = (username: string, password: string) => ({
  text: `SELECT
    id,
    cid,
    username,
    created_at,
    updated_at
  FROM
    users
  WHERE
    username=$1
    AND
    password=crypt($2, password)`,
  values: [username, password]
})
