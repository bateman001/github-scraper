const RepoService = require('../src/repos/repos-service')
const fetch = require('node-fetch')
const UserService = require('./users/users-service')

function scrape(){
    console.log('scraping')
    
    return fetch('https://api.github.com/users') //fetching large amounts of users
            .then(res => res.json())
            .then(body => {
                if(body.message){
                    console.log(body)
                }else{
                    let newEntries = []
                    body.forEach((user) => { //for each user we are conforming res data for our database
                        let newUser = {
                            "username": user.login,
                            "avatar_url": user.avatar_url,
                            "user_url": user.html_url,
                            "github_id": user.id,
                            "repo_api_url": user.repos_url
                        }
                        compileRepos(user.repos_url) //gathering all repos associated with each user
                        newEntries.push(newUser)
                    })
                   return UserService.insertUsers(newEntries)
                }
            })
            .catch()
}

function compileRepos(url){
    
  return fetch(url)
        .then(res => res.json())
        .then(body => {
        if(body.message){
            console.log(body)
        }else{
            let usersRepos = []
    
            body.forEach(repo => {
                let newRepo = {
                    "user_id": repo.owner.id,
                    "name": repo.name,
                    "fullname": repo.full_name,
                    "public_access": repo.private,
                    "repo_url": repo.html_url,
                    "description": repo.description,
                    "fork": repo.fork,
                    "language": repo.language
                }
    
                usersRepos.push(newRepo)
            })
    
           return RepoService.insertRepos(usersRepos)
        }
        })
        .catch()
}

scrape()

module.exports = scrape