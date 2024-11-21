FROM node:20-alpine

ENV MONGO_DB_URI=insert-uri-here
ENV BLOB_CONNECTION_STRING=insert-connection-string-here
ENV PHOTO_SUBMISSION_CONTAINER=photo-submission
ENV MUSIC_SUBMISSION_CONTAINER=music-submission
ENV PHOTO_SUBMISSION_URL=https://wristbandaud.blob.core.windows.net/photo-submission/
ENV MUSIC_SUBMISSION_URL=https://wristbandaud.blob.core.windows.net/music-submission/
ENV MP3_CONTAINER=audio
ENV WEBM_CONTAINER=webm
ENV PORT=8080
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm ci
 
COPY . .
 
CMD [ "npm", "run", "start" ]