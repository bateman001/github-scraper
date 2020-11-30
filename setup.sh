#!/bin/bash

echo setting up your environment 
npm install
npm run migrate:down
npm run migrate
touch .env
echo 'AUTH_TOKEN=""' >> .env
echo 'NODE_ENV=development' >> .env
echo finsihed



