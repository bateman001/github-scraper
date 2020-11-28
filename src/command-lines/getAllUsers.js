const UserService = require("../users/users-service");
const colors = require('colors')
function getAllUsers(){
    UserService.getAllUsers()
    .then(res => {
        console.log(res)
        console.log(`\nThere are ${res.length} users in the database!\n`.green)
        process.exit()
    })
}

getAllUsers()

module.exports = getAllUsers