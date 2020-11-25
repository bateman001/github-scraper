const UserService = require("../users/users-service");
const fetch = require('node-fetch')
const InsertUserAndRepos = require('../InsertUser');

function getUser(user){

    UserService.getUserWithUsername(user)
    .then(res => {
        if(res.length === 0){
            console.log('user not in database, fetching user')
            InsertUserAndRepos(user)
            .then(() => {
                getUser(user)
            })
        }else{
            console.log(`${user} information: `)
            console.log(res)
            process.exit()
        }
    })
}
const [_, __, user] = process.argv;

getUser(user)


module.exports = getUser