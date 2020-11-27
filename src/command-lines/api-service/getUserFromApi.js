const fetch = require('node-fetch')
const UserService = require('../../users/users-service')

function getUserFromApi(url){
        return fetch(url, 
            {
                headers: { authentication: `token 06e02975344a92c7c68844bdd4ef5fa9c4191ee0`}
            }) 
            .then(res => res.json())
            .then(body => {
                if(body.message){
                    console.log('user', body)
                    process.exit()
                }else{
                    let newEntries
                    let repoArr = []

                    if(!Array.isArray(body)){
                        newEntries = {
                            "username": body.login,
                            "avatar_url": body.avatar_url,
                            "user_url": body.html_url,
                            "github_id": body.id,
                            "repo_api_url": body.repos_url
                        }

                        repoArr.push(body.repos_url)
                    }else{
                        newEntries = body.map((user) => { //for each user we are conforming res data for our database
                            repoArr.push(user.repos_url)
                            return {
                                "username": user.login,
                                "avatar_url": user.avatar_url,
                                "user_url": user.html_url,
                                "github_id": user.id,
                                "repo_api_url": user.repos_url
                            }
                        })
                    }

                   return UserService.insertUsers(newEntries)
                            .then(() => {
                                return repoArr
                            })
                   
                }
            })
}

module.exports = getUserFromApi