Journal is a self-hosted website to show your photos.

Note: the theme is optimized for pictures with an aspect ratio of 3:2, 2:3 or 1:1

# Requirements:

- PostgreSQL
- Node v20
- Docker and Docker compose (if installation with docker is used)

# Clone the repository

```
git clone git@github.com:claireso/journal.git
```

# Installation with Node:

### Install dependencies

```
$ npm install
```

### Configure your application

Copy `.env` to `.env.local`

```
$ cp .env .env.local
```

Open and edit `.env.local` to configure your application (server name, database, website title...)

### Bootstrap the application

It will create and setup the database and create an account for the admin

```
$ npm run bootstrap
```

Note: if you enable web push notifications during the installation, do not forget to update your config file with the public and private key printed in your console

Note2: web push notifications are temporarily disabled

### Run the application in a development environment

```
$ npm run dev
```

The application will be running at http://localhost:3000

To change the default port of the application, add it to the command as follow:

```
$ PORT=4000 npm run dev
```

Don't forget to update the entry 'SERVER_NAME' in your config

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

Don't forget to update the entry 'SERVER_NAME' in your config

#### 2 - With an alternative command

If you can't use a reverse proxy just use the commands follow:

```
$ npm run build
$ npm run start:express
```

The application will be running at http://localhost:3000

To change the default port of the application, add it to the command as follow:

```
$ PORT=4000 npm run start:express
```

Note: remove option `output: 'standalone'` from your configuration if you choose this solution

Don't forget to update the entry 'SERVER_NAME' in your config

# Installation with Docker:

Use Docker compose to build an image serving the nextjs application with nginx.

*Note:*

This is still an experimental feature.

The postgres database is not built in a Docker container at the moment. You'll need to configure it to accept connections from your Docker containers.


### Configure your application

Copy `.env.docker` to `.env.docker.local`

```
$ cp .env.docker .env.docker.local
```

Open and edit `.env.docker.local` to configure your application (server name, database, website title...)

### Bootstrap the application

It will create and setup the database and create an account for the admin

```
$ CONFIG_FILE=./env.docker.local npm run bootstrap
```

Note: if you enable web push notifications during the installation, do not forget to update your config file with the public and private key printed in your console

Note2: web push notifications are temporarily disabled

### Create a volume to store your photos

Create a docker volume called `journal_uploads`

```
$ docker volume create journal_uploads --opt device=<path_folder> --opt type=none --opt o=bind
```

### Create and run your image

Create a folder called `certificates` at the root of the repository where you will add `localhost.pem` and `localhost-key.pem` to enable ssl.

Then build your image and run it.

```
$ docker compose up --build
```

The application will be running at https://localhost


![](https://user-images.githubusercontent.com/961038/84236772-7fbe2300-aaf8-11ea-9e2e-a63f8c482b8a.jpg)

![](https://user-images.githubusercontent.com/961038/84236775-8056b980-aaf8-11ea-8479-f15f80a197ac.jpg)
