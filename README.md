Journal is a self-hosted application designed for photographers to publish their work.
By leveraging the latest web technologies, this application provides a responsive and
user-friendly interface that enhances the presentation of a photographic journal, with
the freedom and control that comes from self-hosting.

Note: The theme is optimized for pictures with an aspect ratio of 3:2, 2:3, or 1:1.

# Technical Stack
- [Next.js](https://vercel.com/frameworks/nextjs)
- [PostgreSQL](https://www.postgresql.org/)
- [Vanilla Extract](https://vanilla-extract.style/)
- [Tanstack Query](https://tanstack.com/query)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

# Requirements for installation:
- [Node v20](https://nodejs.org)
- [zx](https://google.github.io/zx/)
- [PostgreSQL](https://www.postgresql.org/) (for standalone installation)
- [Docker](https://www.docker.com/) (for Docker installation)


# Installation

## 1/ Clone the repository

```
git clone git@github.com:claireso/journal.git
```

## 2/ Launch the installation

```
zx scripts/install/start.mjs
```

Choose between a **standalone** installation or an installation using **Docker** and follow the steps.
At the end, a `.env` file will be created at the root of the project with all the variables used by the application.

Example:
![ray-so-export](https://github.com/user-attachments/assets/13fbd2fb-c1e6-4887-b51b-203610da01eb)

## 3/ Launch the application

### Standalone

#### Install dependencies

```
$ npm install
```

#### Run the application in a development environment

```
$ npm run dev
```

The application will be running at http://localhost:3000

To change the default port of the application, add it to the command as follows:

```
$ PORT=4000 npm run dev
```

Note:
  - don't forget to update your `.env`

#### Build and run the application in a production environment

There are two ways to run the application in a production environment

##### 1 - With a reverse proxy (recommanded)

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

Note:
  - don't forget to update your `.env`

##### 2 - With express

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

Note:
  - remove option `output: 'standalone'` from `next.config.js`
  - don't forget to update your `.env`

### Launch with Docker

The installation created all necessary Docker images.
To launch the application, run `docker compose up` and visit https://localhost.

Note:
  - With Docker, HTTPS is used. You will need to generate SSL certificates in the `certificates` folder.
  Files must be named `${SERVER_NAME}.pem` and `${SERVER_NAME}-key.pem` (the same SERVER_NAME in your .env).
  - You can use [Next.js to generate certificates](https://vercel.com/guides/access-nextjs-localhost-https-certificate-self-signed) to launch the application in your local environment



![](https://user-images.githubusercontent.com/961038/84236772-7fbe2300-aaf8-11ea-9e2e-a63f8c482b8a.jpg)

![](https://user-images.githubusercontent.com/961038/84236775-8056b980-aaf8-11ea-8479-f15f80a197ac.jpg)
