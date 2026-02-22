FROM node:20-alpine AS build
WORKDIR ./
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20-alpine
WORKDIR ./

COPY --from=build ./ .

EXPOSE 8000
CMD ["npm", "start"]