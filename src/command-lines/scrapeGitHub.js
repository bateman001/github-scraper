const getUserFromApi = require('./api-service/getUserFromApi')
const getReposFromApi = require('./api-service/getReposFromApi')
const colors = require('colors')

async function scrape(){
    console.log('\nscraping users'.blue)
    const urls = await getUserFromApi('https://api.github.com/users') 
    console.log('\nscraping users repos'.blue)
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