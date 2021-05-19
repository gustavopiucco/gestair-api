FROM node:14

WORKDIR /app

COPY package.json .

RUN mkdir -p /app/node_modules
RUN chown -R node:node /app

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

#ENTRYPOINT ["tail"]
#CMD ["-f","/dev/null"]