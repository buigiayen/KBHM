# build stage
FROM node:16.16.0 as build-stage
WORKDIR /app
COPY . .
RUN npm install -g npm@9.6.2
RUN npm install --legacy-peer-deps
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY ./Cert/certificate.crt /etc/ssl/certificate.crt
COPY ./Cert/private.key /etc/ssl/private.key
COPY .env .
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 443
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]