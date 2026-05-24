FROM node:18-alpine

# place app under /app
WORKDIR /app/postmark-email-api

# copy only server package files and install server deps
COPY postmark-email-api/package*.json ./
RUN npm ci --production

# copy entire repo so frontend build (../build or ../public) is available
COPY . /app

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]