# Base on offical NGINX Alpine image
FROM nginx:1.26.1-alpine3.19

# Create a cache directory with appropriate permissions
RUN mkdir -p /var/cache/nginx/static_cache && chmod -R 755 /var/cache/nginx/static_cache

# Remove the default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom NGINX configuration file
COPY ./default.conf.template /etc/nginx/conf.d/journal.conf.template

RUN apk add --no-cache bash

# Set SERVER_NAME defined in environment variables (.env.docker or .env.docker.local)
CMD /bin/bash -c "envsubst '\$SERVER_NAME' < /etc/nginx/conf.d/journal.conf.template > /etc/nginx/conf.d/journal.conf && nginx -g 'daemon off;'"
