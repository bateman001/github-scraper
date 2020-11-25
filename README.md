
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

## Using this project

1. To populate the database, in your command line run `npm run scrape` 

## API Endpoints

### User Enpoints

- `api/users/` 
  - returns all users

- `api/users/:username`
  - returns specified user

- `api/users/:username/repos`
  - returns all of a specified users repos

### Repository Endpoints

- `api/repos`
  - returns all the repositories

- `api/repos/



## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`


