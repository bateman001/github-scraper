const getUserFromApi = require('./api-service/getUserFromApi')
const getReposFromApi = require('./api-service/getReposFromApi')
const colors = require('colors')
const UserService = require('../users/users-service')

async function scrape(){
    let urls
    const users = await UserService.getAllUsers()

    console.log('\nscraping users'.blue)
    if(users.length === 0){
        urls = await getUserFromApi(`https://api.github.com/users`) 
    }else{
        urls = await getUserFromApi(`https://api.github.com/users?since=${users[users.length - 1].github_id}`)
    }
    console.log('\nscraping users repos... this may take a second'.blue)
    return getReposFromApi(urls)
}

scrape()
.then(() => {
    console.log('\nFinished! Thanks for waiting!\n'.green)

    process.exit()
})
.catch(err=>{
    console.error('\nSomething failed\n'.red, err)
    process.exit()
})


module.exports = scrape