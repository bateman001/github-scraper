const express = require('express')
const path = require('path')
const UserService = require('./users-service')
const userRouter = express.Router()
const jsonParser = express.json()

//returns all users path
userRouter
    .route('/')
    .get((req, res, next) => {
        UserService.getAllUsers()
        .then(users => {
            res.status(201).json(users)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {
            username,
            avatar_url, 
            user_url, 
            github_id, 
            repo_api_url
        } = req.body
        const newUsers = {username, avatar_url, github_id, user_url, repo_api_url}
        
        for(const[key, value] of Object.entries(newUsers)){
            if(value == null){
                return res.status(400).json({
                    error: `Missing ${key} in reqest body`
                })
            }
        }

        UserService.insertUsers(newUsers)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(next)
    })

//returns all users
userRouter
    .route('/:username')
    .get((req, res, next) => {
        const { username } = req.params        
        UserService.getUserWithUsername(username)
        .then(user => {
            if(!user){
                res.status(404).send({
                    error: `Username ${username} does not exist`
                })
            }
            res.status(201).json(user)
            next()
        })
        .catch(next)
    })

//returns all repos from a particular user
userRouter
    .route('/:username/repos')
    .get((req, res, next) => {
        const { username } = req.params
        UserService.getReposWithUsername(username)
        .then(repos => {
            if(!repos){
                res.status(404).send({
                    error: `Username ${username} does not exit`
                })
            }
            res.status(201).json(repos)
            next()
        })
        .catch(next)
    })

module.exports = userRouter