FROM node:14 as build

WORKDIR /app
ADD . ./
RUN npm install
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build/ /var/www/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
