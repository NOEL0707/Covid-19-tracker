# Get the base image
FROM node:18.3.0 as build
# Set working directory
WORKDIR /usr/src/app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy project files to /usr/src/app/
COPY . /usr/src/app/

RUN  npm i --silent

# Get the production files ready
RUN npm run build --silent

FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /usr/src/app/dist /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]