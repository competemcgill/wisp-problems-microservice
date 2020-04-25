FROM node:11.13.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json tsconfig.json swaggerDoc.js /app/
RUN npm install

COPY src /app/src/
RUN npm run build && rm -rf src

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]