FROM node:20-alpine as build

WORKDIR /web

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


FROM nginx:alpine

COPY --from=build /web/dist /usr/share/nginx/html

# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
