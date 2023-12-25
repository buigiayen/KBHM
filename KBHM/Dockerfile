# build stage
FROM node:16.16.0 as build-stage
WORKDIR /app
COPY . .
ENV TZ=Asia/Ho_Chi_Minh
RUN npm install -g npm@9.6.2
RUN npm install --legacy-peer-deps
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
ENV TZ=Asia/Ho_Chi_Minh
COPY ./Cert/vn/certificate.crt /etc/ssl/vn/certificate.crt
COPY ./Cert/vn/private.key /etc/ssl/vn/private.key
COPY .env .
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]