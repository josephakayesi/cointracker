FROM node:alpine AS BUILD_IMAGE 

RUN apk update

WORKDIR /app

ADD package*.json /app/

# RUN npm ci --only=production
COPY . /app

RUN npm run build && npm prune --production

# RUN npm run build

FROM node:alpine 

WORKDIR /app

COPY --from=BUILD_IMAGE /app/.env ./

COPY --from=BUILD_IMAGE /app/dist ./dist

COPY --from=BUILD_IMAGE /app/package*.json ./

COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

EXPOSE 5000

CMD ["npm", "start"]