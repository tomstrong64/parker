FROM node:latest AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app
COPY ./server/package*.json /usr/src/app/
ENV NODE_ENV=production
RUN npm ci --omit=dev


FROM node:latest AS build-client

WORKDIR /usr/src/app/client
COPY ./client/package*.json /usr/src/app/client/
ENV NODE_ENV=production
RUN npm ci
COPY ./client /usr/src/app/client
RUN npm run build


FROM node:20.10.0-bookworm-slim

ENV NODE_ENV=production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build-client /usr/src/app/client/build /usr/src/app/client/build
COPY --chown=node:node ./server/src /usr/src/app/src
COPY --chown=node:node ./server/package*.json /usr/src/app/

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD npm run healthcheck

CMD ["dumb-init", "npm", "start"]
