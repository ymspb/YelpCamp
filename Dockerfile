FROM node:22

WORKDIR /app

COPY src/ ./

RUN npm ci --omit=dev

EXPOSE 80

CMD ["node", "app.js"]