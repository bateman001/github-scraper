
## Description

Welcome to GitHub Scraper. GitHub Scraper pulls user data and repo data from the GitHub API then stores it in an SQLite database. This project was meant to be used from both Postman/Browser and the command line. I will provide endpoints below and describe how to run the command line prompts.

## Set up

Complete the following steps to use this project:

1. Clone this repository to your local machine `git clone URL PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "github-scraper",`

## Using this projects

Before you do anything, in your terminal run `npm run scrape`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`


## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

