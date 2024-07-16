# Base on offical NGINX Alpine image
FROM nginx:1.26.1-alpine3.19

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
COPY ./journal.conf /etc/nginx/conf.d/
