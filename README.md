Journal is a self-hosted website to show your photos.

Note: the theme is optimized for pictures with an aspect ratio of 3:2 or 1:1

![demo](https://user-images.githubusercontent.com/961038/52224932-8061fc00-28a9-11e9-9e34-e1171a91d3fb.gif)

# Requirements:

- Node v10
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

By default the application will be running at http://localhost:3000

![](https://user-images.githubusercontent.com/961038/53236483-a69ede80-3694-11e9-9228-2dcbb6812c72.jpg)

![](https://user-images.githubusercontent.com/961038/53236484-a69ede80-3694-11e9-901a-4cd079442def.jpg)

