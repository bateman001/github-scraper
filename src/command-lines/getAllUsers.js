const UserService = require("../users/users-service");

function getAllUsers(){
    UserService.getAllUsers()
    .then(res => {
        console.log(res)
        process.exit()
    })
}

getAllUsers()

module.exports = getAllUsers