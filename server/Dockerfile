FROM node:18

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

# Install Nodemon globally
RUN npm install -g nodemon

EXPOSE 3001

CMD ["nodemon", "src/index.js"]
