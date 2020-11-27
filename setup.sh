#!/bin/bash

echo setting up your project :)
npm run migrate:down
npm run migrate
touch .env
echo 'AUTH_TOKEN="f8e51e4a5ed1c9dd739614b84f0c20f112bac55d' >> .env
echo finsihed



