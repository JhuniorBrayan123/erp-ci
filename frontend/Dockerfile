FROM nginx:1.25-alpine

# Nginx config for SPA + reverse proxy /api -> api:3000
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Simple SPA files
COPY index.html /usr/share/nginx/html/index.html

# Runtime env injection (official nginx image runs scripts in /docker-entrypoint.d)
COPY docker-entrypoint.d/99-env.sh /docker-entrypoint.d/99-env.sh
RUN chmod +x /docker-entrypoint.d/99-env.sh

EXPOSE 80
