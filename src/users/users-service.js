const db = require('../db-config')
const RepoService = require('../repos/repos-service')

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
    },
    getSpecificUsersRepo(username, reponame){
        return db
            .select('repos.name',
                'repos.fullname',
                'repos.repo_url',
                'repos.user_id',
                'repos.public_access',
                'repos.fork',
                'repos.description',
                'repos.language',
                )
            .from('repos')
            .where('repos.name', reponame)
            .join('users', {'users.github_id': 'repos.user_id'})
            .where('users.username', username)
    }
}

module.exports = UserService