const getUserFromApi = require('./api-service/getUserFromApi')
const getReposFromApi = require('./api-service/getReposFromApi')

async function scrape(){
    console.log('scraping')
    const urls = await getUserFromApi('https://api.github.com/users') 
    console.log('inserting repos')
    return getReposFromApi(urls)
}

scrape()
.then(() => {
    console.log('finished')
    process.exit()
})
.catch(err=>{
    console.error("Something failed:",err)
    process.exit()
})


module.exports = scrape