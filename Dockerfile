FROM node:20-alpine

ENV PORT=8080
ENV KEY_VAULT_NAME=wristband-i-kv
ENV AZURE_TENANT_ID=037257ff-dd79-4adb-aa35-e1b5a2e22461
ENV AZURE_CLIENT_ID=831e1386-d784-4e1f-8674-84652367dd69
ENV AZURE_CLIENT_SECRET=git-from-readme
ENV LOKI_HOST=http://host.docker.internal:3100

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . .
RUN mkdir /app/assets

EXPOSE 8080
CMD [ "npm", "run", "start" ]