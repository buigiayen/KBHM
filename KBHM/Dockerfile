# build stage
FROM node:16.16.0 as build-stage
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]