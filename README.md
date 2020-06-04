Journal is a self-hosted website to show your photos.

Note: the theme is optimized for pictures with an aspect ratio of 3:2 or 1:1


# Requirements:

- Node v12
- PostgreSQL

# Installation:

### Clone the repository

```
git clone git@github.com:claireso/journal.git
```

### Install dependencies

```
$ npm install
```

### Copy config-sample.json and configure your application

For that, you need to choose the environment in which you want to run your application (`development`, `production`, `test` etc.)

Example for a development environment:

```
$ cp config-sample.json ./config/config.development.json
```

Example for a production environment:

```
$ cp config-sample.json ./config/config.production.json
```

Example for a test environment:

```
$ cp config-sample.json ./config/config.test.json
```

### Bootstrap the application

It will create and setup the database and create an account for the admin

Set `NODE_ENV` as your environment. If you omit to declare your environment, the application will choose your `development` environment by default.

Example for a development environment:

```
$ NODE_ENV=development npm run bootstrap
```

Example for a production environment:

```
$ NODE_ENV=production npm run bootstrap
```

Example for a test environment:

```
$ NODE_ENV=test npm run bootstrap
```

Note: if you enable web push notifications during the installation, do not forget to update your config file with the public and private key printed in your console

### Run the application in a development environment

```
$ npm run dev
```

The application will be running at http://localhost:3000

To change the default port of the application, add it to the command as follow:

```
$ PORT=4000 npm run dev
```

Don't forget to update the entry 'baseUrl' in your config

### Build and run the application in a production environment

There are two ways to run the application in a production environment

#### 1 - With a reverse proxy (recommanded)

By default the folder where your photos are uploaded (`uploads`) is not served by the server himself.
You will need to configure a reverse proxy (with nginx for example)

When your reverse proxy is configured run the commands follow:

```
$ npm run build
$ npm run start
```

The application will be running at http://localhost:3000

To change the default port of the application, add it to the command as follow:

```
$ npm run start -- -p 4000
```

Don't forget to update the entry 'baseUrl' in your config

#### 2 - With an alternative command

If you can't use a reverse proxy just use the commands follow:

```
$ npm run build
$ npm run start:custom
```

The application will be running at http://localhost:3000

To change the default port of the application, add it to the command as follow:

```
$ PORT=4000 npm run start:custom
```

Don't forget to update the entry 'baseUrl' in your config

![](https://user-images.githubusercontent.com/961038/65306681-44548080-db86-11e9-80d3-d873e3e72b6b.jpg)

![](https://user-images.githubusercontent.com/961038/65673229-bcb9b680-e04a-11e9-89ea-2d6b94a3f989.jpg)

