FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i

COPY public public
COPY .prettierrc ./
COPY .eslintrc.js ./
COPY tailwind.config.js tailwind.config.js
COPY postcss.config.js postcss.config.js
COPY tsconfig.json tsconfig.json
COPY src src

CMD npm start