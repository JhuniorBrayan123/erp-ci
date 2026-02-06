FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html

COPY docker-entrypoint.d/99-env.sh /docker-entrypoint.d/99-env.sh
RUN sed -i 's/\r$//' /docker-entrypoint.d/99-env.sh \
 && chmod +x /docker-entrypoint.d/99-env.sh

EXPOSE 80
