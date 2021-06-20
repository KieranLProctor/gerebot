FROM node:latest

# Create the directory.
RUN mkdir -p /usr/src/gerebot
WORKDIR /usr/src/gerebot

# Copy and install packages.
COPY package.json /usr/src/gerebot
RUN yarn add

# Copy all files over.
COPY . /usr/src/gerebot

# Start the bot.
CMD ["node", "gerebot.js"]