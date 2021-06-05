FROM node:12

ENV PORT 3000
EXPOSE 3000

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

COPY package*.json ./
USER node
RUN npm install

COPY --chown=node:node . .
RUN npm run build

CMD [ "npm", "run", "start" ]
