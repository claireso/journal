Journal is a self-hosted website to show your photography.

# Requirements:

- Node v8
- PostgreSQL
- nodemon

# Installation:

- Clone the repository

- Install dependencies

```
$ npm install
```

- Create a database

- Setup your database

```
$ psql ${database} -f server/db/setup.sql -U ${username} -h 127.0.0.1
```

- Copy config-sample.json and configure your website

```
$ cp config-sample.json config.json
```

- Generate an htpassword file in server folder to protect your admin pages.
The file must be named `htpasswd`

Run your website

```
$ npm run server
```
