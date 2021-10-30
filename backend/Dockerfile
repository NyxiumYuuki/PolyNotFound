FROM node:current-slim
WORKDIR /app-backend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ./app/jwtRS256.sh
CMD node server.js
