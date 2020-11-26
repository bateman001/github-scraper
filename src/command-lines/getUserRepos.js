const InsertUserAndRepos = require("../InsertUser");
const UserService = require("../users/users-service");

async function getUserRepo(username){
        const user = await UserService.getUserWithUsername(username)
        if(user.length === 0){
            console.log('user not in database, fetching user')
            await InsertUserAndRepos(username)
            return getUserRepo(username)
        }else{
            const repos = await UserService.getReposWithUsername(username)
            console.log(repos)
            console.log(`${username} has a total of ${repos.length} repos`)
            process.exit()
        }
}

const [_, __, user] = process.argv;

getUserRepo(user)

module.exports = getUserRepo