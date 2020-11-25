function insertUser(user){
    return fetch(`https://api.github.com/users/${user}`) //fetching large amounts of users
    .then(res => res.json())
    .then(body => {
        if(body.message){
            console.log(body)
        }else{
            let newUser = {
                "username": body.login,
                "avatar_url": body.avatar_url,
                "user_url": body.html_url,
                "github_id": body.id
            }
            compileRepos(body.repos_url) //gathering all repos associated with each user
            UserService.insertUsers(newUser)
            .then(() => { 
                console.log('scraped')
            })
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

        RepoService.insertRepos(usersRepos)
        }
    })
    .catch()
}

module.exports = insertUser