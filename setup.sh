#!/bin/bash

echo setting up your project :)
npm install
npm run migrate:down
npm run migrate
touch .env
echo 'AUTH_TOKEN=""' >> .env
echo finsihed



