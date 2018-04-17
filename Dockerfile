FROM node:latest

ADD src /src
WORKDIR /src
RUN yarn install
RUN yarn build
CMD yarn start
