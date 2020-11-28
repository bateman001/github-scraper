const RepoService = require('../repos/repos-service')
const colors = require('colors')

function getRepo(repo){
    RepoService.getRepoByName(repo)
    .then(res => {
        if(res.length === 0){
            console.log(`We do not have ${repo} in this database!`.red)
            console.log('')
            process.exit()
        }
        console.log(res)
        console.log('')
        console.log('')
        process.exit()
    })
}

[_, __, reponame] = process.argv

getRepo(reponame)
module.exports = getRepo