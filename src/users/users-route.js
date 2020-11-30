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
        
        //for every value in newUsers, if one is missing send a 400 error
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

//returns specific user
userRouter
    .route('/:username')
    .get((req, res, next) => {
        const { username } = req.params        
        UserService.getUserWithUsername(username)
        .then(user => {
            if(user.length === 0){
                return res.status(404).send({
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
                return res.status(404).send({
                    error: `Username ${username} does not exit`
                })
            }
            res.status(201).json(repos)
            next()
        })
        .catch(next)
    })

//returns specific users repo
userRouter
    .route('/:username/repos/:reponame')
    .get((req, res, next) => {
        const {username, reponame} = req.params

        UserService.getSpecificUsersRepo(username, reponame)
        .then(repo => {
            if(!repo){
               return res.status(404).send({
                    error: `User, ${username}, or the repo, ${reponame}, does not exist`
                })
            }
            res.status(201).json(repo)
            next()
        })
        .catch(next)
    })
module.exports = userRouter