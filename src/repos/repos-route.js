const express = require('express')
const path = require('path')
const RepoService = require('./repos-service')
const repoRoute = express.Router()
const jsonParser = express.json()

repoRoute
    .route('/') //get all repos
    .get((req, res, next) => {
        RepoService.getAllRepos()
        .then(repos => {
            res.status(201).json(repos)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {name, repo_url, public_access, user_id} = req.body
        const newRepo = {name, repo_url, public_access, user_id}
        for(const[key, value] of Object.entries(newRepo)){
            if(value == null){
                res.status(400).send({
                    error: `Missing ${key} in request params`
                })
            }
        }
        RepoService.insertRepos(newRepo)
        .then(repos => {
            res.status(201).json(repos)
        })
        .catch(next)

    })

repoRoute
    .route('/:repo_name') //get repo with it's name
    .get((req, res, next) => {
        const { repo_name } = req.params
        RepoService.getRepoByName(repo_name)
        .then(repo => {
            if(!repo){
                res.status(404).send({
                    error: `Repo ${repo_name} does not exist`
                })
            }
            res.status(201).json(repo)
            next()
        })
        .catch(next)
    })

module.exports = repoRoute