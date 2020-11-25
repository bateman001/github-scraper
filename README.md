
## Description

Welcome to GitHub Scraper. GitHub Scraper pulls user data and repo data from the GitHub API then stores it in an SQLite database. This project was meant to be used from __both__ Postman/Browser and the command line on your local machine. I will provide descriptions of the endpoints and command line prompts below.

## Set up

Complete the following steps to use this project:

1. Clone this repository to your local machine `git clone URL PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "github-scraper",`
7. Populate the database, in your command line run `npm run scrape` 

## Scripts 

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

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

- `api/repos/:repo_name`
  - returns specific repository along with user info



## Command Line

- `npm run getUser *USERNAME*`
  - returns the user and if user is not it database it fetches the user and all of users repositories from github api

- `npm run getUsersRepos *USERNAME*`
  - returns all repos associated with a username, if user is not in database will fetch user from github api

- `npm run getRepo *REPO_NAME*`
  - returns the repo and the user associated with the repo


### Important Links

- [Repo](https://github.com/bateman001/github-scraper)
- [Gist](https://gist.github.com/bateman001/eea2d261c2508746d28ab82008605a5c)



