const knex = require('knex')
const config = require('../../knexfile')
const db = knex(config.development)

const UserService = {
    insertUsers(users){
        return db
        .insert(users)
        .into("users")
    },
    getAllUsers(){
        return db
        .select('*')
        .from('users')
    },
    getUserWithUsername(username){
        return db
        .select('*')
        .from('users')
        .where(username)
    },
    getReposWithUsername(username){
        return db
        .from('users')
        .select('users.username', 
            'users.user_url', 
            'repos.repo_url', 
            'repos.name', 
            'repos.public_access')
        .join('repos', {'repos.user_id': 'users.id'})
        .where('users.username', username)
    }
}

module.exports = UserService