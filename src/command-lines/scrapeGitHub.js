const getUserFromApi = require('./api-service/getUserFromApi')
const getReposFromApi = require('./api-service/getReposFromApi')
require('dotenv').config();

async function scrape(){
    console.log('scraping users')
    const urls = await getUserFromApi('https://api.github.com/users?per_page=10') 
    console.log('scraping users repos')
    return getReposFromApi(urls)
}

scrape()
.then(() => {
    console.log('Finished! Thanks for waiting!')
    process.exit()
})
.catch(err=>{
    console.error("Something failed:", err)
    process.exit()
})


module.exports = scrape