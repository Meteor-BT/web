FROM node:20-alpine as build

WORKDIR /web

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


FROM nginx:1.25

RUN rm -rf /etc/nginx/conf.d/

COPY --from=build /web/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
