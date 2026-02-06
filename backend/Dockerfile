FROM node:20-alpine

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

# For the healthcheck we use wget (busybox provides it)
RUN apk add --no-cache wget

EXPOSE 3000
CMD ["node", "src/index.js"]
