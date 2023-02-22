# build stage
FROM node:16.16.0 as build-stage
WORKDIR /app
COPY . .
RUN npm i @ant-design/pro-cli -g
RUN yarn install
RUN yarn run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8001
CMD ["nginx", "-g", "daemon off;"]