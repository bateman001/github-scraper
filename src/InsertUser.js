const fetch = require('node-fetch')

const config = require('../knexfile')
const knex = require('knex')
const db = knex(config.development)

function insertUser(user){
    return fetch(`https://api.github.com/users/${user}`) //fetching large amounts of users
        .then(res => res.json())
        .then(body => {
            if(body.message){
                console.log(body)
                process.exit()
            }
            else{
                let newUser = {
                    "username": body.login,
                    "avatar_url": body.avatar_url,
                    "user_url": body.html_url,
                    "github_id": body.id,
                    "repo_api_url": body.repos_url
                }

                return db.insert(newUser).into('users')
            }
        })
}

function compileRepos(username){

    return fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(body => {
        if(body.message){
            console.log(body)
            process.exit()
        }else{
            console.log('inserting repos')

            let userRepos = []
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

                userRepos.push(newRepo)
            })
            
            return db('repos').insert(userRepos)
            }
        })
}

async function InsertUserAndRepos(username){
    await insertUser(username)
    return compileRepos(username)
}

module.exports = InsertUserAndRepos