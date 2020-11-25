const UserService = require("../users/users-service");
const fetch = require('node-fetch')

function getUser(user){
    UserService.getUserWithUsername(user)
    .then(res => {
        if(res.length === 0){
            fetch(`https://api.github.com/${user}`)
            .then(res => res.json())
            .then(body => {
                if(!body){
                    console.log(`${user} does not exist`)
                    process.exit()
                }
                
            })
        }
        console.log(res)
        process.exit()
    })
}
const [_, __, user] = process.argv;

getUser(user)

module.exports = getUser