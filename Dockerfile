FROM node:22

WORKDIR /app

COPY src/ ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "app.js"]