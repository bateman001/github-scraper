
## Description

Welcome to GitHub Scraper. GitHub Scraper pulls user data and repo data from the GitHub API then stores it in an SQLite database. This project was meant to be used from __both__ Postman/Browser and the command line on your local machine. I will provide descriptions of the endpoints and command line prompts below.

## Set up

Complete the following steps to use this project:

*if not cloning from github start at step 2*

1. Clone this repository to your local machine `git clone URL PROJECTS-NAME`
2. `cd` into repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Copy the AUTH_TOKEN I sent you and paste it inbetween the the double quotes on line 7 of setup.sh
5. Now set up your project with `npm run setup`
7. Populate the database, in your command line run `npm run scrape` 
 

# Command Line Scripts

### To get the project running

- `npm start`
  - Start the application

- `npm run dev`
  - Start nodemon for the application

- `npm test`
  - Run the tests 

- `npm run migrate:down`
  - migrates the database down to 0 *can use to clear data from database*

- `npm run migrate`
  - migrates the database to latest verion

### To functionally use this project

- `npm run scrape`
  - scrapes user and repository information from the github api

- `npm run getAllUsers`
  - returns all the users in the database

- `npm run getUser USERNAME`
  - returns the user and if user is not it database it fetches the user and all of users repositories from github api

- `npm run getUsersRepos USERNAME`
  - returns all repos associated with a username, if user is not in database will fetch user from github api

- `npm run getRepo REPONAME`
  - returns the repo and the user associated with the repo


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


### Important Links

- [Repo](https://github.com/bateman001/github-scraper)
- [Gist](https://gist.github.com/bateman001/eea2d261c2508746d28ab82008605a5c)



