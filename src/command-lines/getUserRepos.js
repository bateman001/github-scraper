const UserService = require("../users/users-service");
const getUserFromApi = require('./api-service/getUserFromApi')
const getReposFromApi = require('./api-service/getReposFromApi'
)
async function getUserRepo(username){
    if(!username){
        console.log('please enter a username')
        process.exit()
    }
    const user = await UserService.getReposWithUsername(username)
    
    if(user.length === 0){
        console.log('user is not in the database, fetching user')

        const url = await getUserFromApi(`https://api.github.com/users/${username}`)
        await getReposFromApi(url)
        return getUserRepo(username)
    }else{
       return user 
    }
}

const [_, __, user] = process.argv;

getUserRepo(user)
.then(res => {
    console.log(res)
    console.log(`${user} has ` + res.length + ' repositories')
    process.exit()
})
.catch(err=>{
    console.error("Something failed:", err)
    process.exit()
})
module.exports = getUserRepo