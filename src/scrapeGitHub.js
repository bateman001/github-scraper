const config = require('../knexfile')
const knex = require('knex')
const db = knex(config.development)
const RepoService = require('../src/repos/repos-service')

function scrape(){
    console.log('scraping')

    fetch('https://api.github.com/repositories')
    .then(res => {
        console.log(res.length)
        const newRepos
        //pull data we want from the res
        res.map((x, i) => {

        })
        
    })
}

scrape()
// .then(() => {
//     console.log('scraping successful')
//     process.exit()
// })
// .catch((e) => {
//     console.log('scraping unsuccessful')
//     process.exit()
// })

module.exports = scrape