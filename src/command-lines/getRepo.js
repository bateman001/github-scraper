const fetch = require('node-fetch')
const RepoService = require('../repos/repos-service')

function getRepo(repo){
    RepoService.getRepoByName(repo)
    .then(res => {
        console.log(res)
        process.exit()
    })
}

[_, __, reponame] = process.argv

getRepo(reponame)
module.exports = getRepo