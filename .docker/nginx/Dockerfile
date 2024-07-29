# Base on offical NGINX Alpine image
FROM nginx:1.26.1-alpine3.19

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

COPY ./default.conf.template /etc/nginx/conf.d/journal.conf.template

RUN apk add --no-cache bash

CMD /bin/bash -c "envsubst '\$SERVER_NAME' < /etc/nginx/conf.d/journal.conf.template > /etc/nginx/conf.d/journal.conf && nginx -g 'daemon off;'"
