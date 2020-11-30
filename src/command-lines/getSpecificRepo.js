const UserService = require("../users/users-service")
const colors = require('colors')

function SpecificRepo(username, reponame){
    if(!username || !reponame){
        console.log('\nplease enter the proper arguments\n'.red)
        process.exit()
    }
    console.log(`fetching ${username}s repo, ${reponame}\n`.blue)
    const repo = UserService.getSpecificUsersRepo(username, reponame)
    return repo
}

const [_, __, user, repo] = process.argv

SpecificRepo(user, repo)
.then((res) => {
    if(res.length === 0){
        console.log(res)
        console.log('\nlooks like there is nothing here\n'.yellow)
    }else{
        console.log(res)
        console.log('\nFound it!\n'.green)
    }
    process.exit()
})
.catch(err=>{
    console.error("Something failed:".red, err)
    process.exit()
})

module.exports = SpecificRepo