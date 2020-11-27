const db = require('../db-config')

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
        .where('username', username)
    },
    getReposWithUsername(username){
        return db
        .from('users')
        .select('repos.name',
            'repos.fullname',
            'repos.description',
            'repos.repo_url',
            'repos.public_access',
            'repos.fork',
            'repos.language')
        .join('repos', {'repos.user_id': 'users.github_id'})
        .where('users.username', username)
    }
}

module.exports = UserService