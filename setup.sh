#!/bin/bash

echo setting up your project :)
npm install
npm run migrate:down
npm run migrate
touch .env
echo 'AUTH_TOKEN="2ed2a997fc7cab47b5862b7b2ee840d93bb130e0"' >> .env
echo finsihed



