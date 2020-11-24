const config = require('../knexfile')
const knex = require('knex')
const db = knex(config.development)
const RepoService = require('../src/repos/repos-service')
const fetch = require('node-fetch')
const UserService = require('./users/users-service')

function scrape(){
    console.log('scraping')
    
    return fetch('https://api.github.com/users') //fetching large amounts of users
            .then(res => res.json())
            .then(body => {
                console.log(body)
                if(body.message){
                    console.log(body.message)
                }else{
                    let newEntries = []
                    body.forEach((user) => { //for each user we are conforming res data for our database
                        let newUser = {
                            "username": user.login,
                            "avatar_url": user.avatar_url,
                            "user_url": user.html_url,
                            "github_id": user.id
                        }
                        // compileRepos(user.repos_url) //gathering all repos associated with each user
                        newEntries.push(newUser)
                    })
            }
                // UserService.insertUsers(newEntries)
                // .then((res) => {
                //     console.log(res)
                //     console.log('users successfully scraped')
                // })
            })
            .catch()
}

function compileRepos(url){
    
  return fetch(url)
        .then(res => res.json())
        .then(body => {
        let usersRepos = []

        body.forEach(repo => {
            let newRepo = {
                "name": repo.name,
                "description": repo.description,
                "fullname": repo.full_name,
                "private": repo.private,
                "user_id": repo.owner.id,
                "repo_url": repo.html_url,
                "fork": repo.fork,
                "language": repo.language
            }

            usersRepos.push(newRepo)
        })

        RepoService.insertRepos(usersRepos)
        .then(res => {
            console.log(res)
            console.log('repos successfully scraped')
        })
    })
}
scrape()

module.exports = scrape