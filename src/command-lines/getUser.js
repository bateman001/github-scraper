const UserService = require("../users/users-service")
// const fetch = require('node-fetch')
// const InsertUserAndRepos = require('./InsertUser')
const getUserFromApi = require("./api-service/getUserFromApi")
const getReposFromApi = require('./api-service/getReposFromApi')

async function getUser(username){

    const user = await UserService.getUserWithUsername(username)
    
    if(user.length === 0){
        console.log('user is not in the database, fetching user')
        const url = await getUserFromApi(`https://api.github.com/users/${username}`)
        const repos = await getReposFromApi(url)
        return getUser(username)
    }else{
       return user 
    }
}

const [_, __, user] = process.argv

getUser(user).then(res => {
    console.log(res)
    process.exit()
})


module.exports = getUser