const InsertUserAndRepos = require("../InsertUser");
const UserService = require("../users/users-service");

async function getRepos(username){
    try{
        const user = await UserService.getUserWithUsername(username)
        if(user.length === 0){
            console.log('user not in database, fetching user')
            const insert = await InsertUserAndRepos(username)
            getRepos(username)
        }else{
            const repos = await UserService.getReposWithUsername(username)
            console.log(repos)
            console.log(`${username} has a total of ${repos.length} repos`)
            process.exit()
        }

    }catch(error){
        console.log('user not in database')
        process.exit()
    }

}

const [_, __, user] = process.argv;

getRepos(user)

module.exports = getRepos