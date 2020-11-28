const UserService = require("../users/users-service");
const getUserFromApi = require('./api-service/getUserFromApi')
const getReposFromApi = require('./api-service/getReposFromApi')
const colors = require('colors');
const RepoService = require("../repos/repos-service");

async function getUserRepo(username){
    if(!username){
        console.log('\nplease enter a username\n'.red)
        process.exit()
    }
    const user = await UserService.getUserWithUsername(username)
    
    if(user.length === 0){
        console.log(`\n${username} is not in the database, fetching user`.blue)

        const url = await getUserFromApi(`https://api.github.com/users/${username}`)

        console.log(`\nscraping ${username}'s repos\n`.blue)

        await getReposFromApi(url)
        return getUserRepo(username)
    }else{
        const repos = await UserService.getReposWithUsername(username)
        return repos 
    }
}

const [_, __, user] = process.argv;

getUserRepo(user)
.then(res => {
    console.log(res)
    console.log(`\n${user} has ${res.length} repositories\n`.green)
    process.exit()
})
.catch(err=>{
    console.error("Something failed:", err)
    process.exit()
})
module.exports = getUserRepo