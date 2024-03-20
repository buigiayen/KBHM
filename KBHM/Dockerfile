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
COPY ./Cert/com/hienmaubvdktinhthanhhoa_com.crt /etc/ssl/com/hienmaubvdktinhthanhhoa_com.crt
COPY ./Cert/com/private.key /etc/ssl/com/private.key
COPY .env .
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]