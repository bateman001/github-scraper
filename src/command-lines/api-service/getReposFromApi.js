const RepoService = require('../../repos/repos-service')
const fetch = require('node-fetch')

async function compileRepos(arr) {
    for(let i = 0; i < arr.length; i++){
        await fetchRepos(arr[i])
    }
    return
}

function fetchRepos(url){   
    
    return fetch(url,{
            headers: { auth: `token 06e02975344a92c7c68844bdd4ef5fa9c4191ee0`}
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
            
            return RepoService.insertRepos(userRepos)
            }
        })
}

module.exports = compileRepos