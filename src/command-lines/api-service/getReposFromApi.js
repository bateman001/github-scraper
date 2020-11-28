const RepoService = require('../../repos/repos-service')
const fetch = require('node-fetch')
require('dotenv').config();

async function compileRepos(arr) {
    for(let i = 0; i < arr.length; i++){
        const repo = await fetchRepos(arr[i])
        await RepoService.insertRepos(repo)
    }
    return
}

function fetchRepos(url){   
    return fetch(url,{
            headers: { authorization: `token ${process.env.AUTH_TOKEN}`}
        })
        .then(res => res.json())
        .then(body => {
        if(body.message){
            console.log('repo', body)
            process.exit()
        }else{
            let userRepos = body.map(repo => {
                return {
                    "user_id": repo.owner.id,
                    "name": repo.name,
                    "fullname": repo.full_name,
                    "public_access": repo.private,
                    "repo_url": repo.html_url,
                    "description": repo.description,
                    "fork": repo.fork,
                    "language": repo.language
                }
            })
            return userRepos
            }
        })
}

module.exports = compileRepos