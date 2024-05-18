FROM node:alpine

ENV LMS_SERVICE_PORT=3000 \
    SALT_ROUNDS=7 \
    JWT_SECRET=lms_service_app_bG1zX3NlcnZpY2VfYXBw

# Create app directory
WORKDIR /home/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# Bundle app source
COPY ./ /home/app

RUN npm install
RUN npm run build

CMD [ "node", "/home/app/dist/src/main.js" ]