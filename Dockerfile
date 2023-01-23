FROM node:18-alpine
RUN npm install -g npm@9.3.1
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# Set working directory
WORKDIR /home/node/app
COPY . .

# Install dependencies
COPY .gitignore .gitignore
COPY package*.json ./
RUN npm install

COPY --chown=node:node . .

# Build the project
RUN npm run build

EXPOSE 4000
CMD ["npm", "run", "start"]
