FROM node:12.2.0-alpine
FROM node:12.2.0 as build-deps

RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./ 
RUN yarn 

COPY . ./
RUN yarn build 

# # Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 3100
CMD ["nginx", "-g", "daemon off;"] 

# # run 
# # docker run -p 3100:80 name:tag

