Journal is a self-hosted website to show your photography.

# Requirements:

- Node v8
- PostgreSQL
- nodemon (only for development)

# Installation:

- Clone the repository

- Install dependencies

```
$ npm install
```

- Copy config-sample.json and configure your application

```
$ cp config-sample.json config.json
```

- Bootstrap the application. it will create and setup the database and create an account for the admin

```
$ npm run bootstrap
```

Note: if you enable web push notification during the installation, do not forget to update your config file with the public and private key printed in your console

- Build the application

```
$ npm run build
```

Run your website

```
$ npm run server
```
