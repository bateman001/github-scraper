const knex = require('knex')
const config = require('../../knexfile')
const db = knex(config.development)

const RepoService = {
    getAllRepos(){
        return db
            .select('*')
            .from('repos')
    },
    insertRepos(repos){
        return db
            .insert(repos)
            .into('repos')
    },
    getRepoByName(name){
        return db
            .from('repos')
            .select('repos.name',
                'repos.fullname',
                'repos.description', 
                'repos.fork',
                'repos.language',
                'repos.repo_url', 
                'repos.public_access', 
                'users.username', 
                'users.user_url',
                )
            .join('users', {'repos.user_id': 'users.github_id'})
            .where('repos.name', name)
    }
    
}

module.exports = RepoService