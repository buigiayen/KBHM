# build stage
FROM node:16.16.0 as build-stage
WORKDIR /app
COPY . .
ENV TZ=Asia/Ho_Chi_Minh
ENV GENERATE_SOURCEMAP=false
RUN npm install -g npm@9.6.2
RUN npm install --force
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
ENV TZ=Asia/Ho_Chi_Minh
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 8443
CMD ["nginx", "-g", "daemon off;"]