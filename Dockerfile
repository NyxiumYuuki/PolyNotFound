FROM node:current-slim
WORKDIR /app-frontend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --NODE_ENV
RUN npm install -g @angular/cli
COPY . .
